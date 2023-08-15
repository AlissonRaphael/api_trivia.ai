import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Challenge } from '@prisma/client';
import { ChallengeService } from './challenge.service';
import { CreateChallenge } from './dtos/create-challenge-dto';
import { IndexValidatorQueryPipe } from '../../shared/pipes/index-validator-query.pipe';
import { UpdateChallenge } from './dtos/update-challenge.dto';
import { HttpService } from '@nestjs/axios';
import { PlayerService } from '../player/player.service';
import { QuestionBuilderService } from '../question-builder/question.service';
import { GPTResponse } from './types/completions';

@Controller('api/v1')
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly playerService: PlayerService,
    private readonly questionBuilderService: QuestionBuilderService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/challenges/:playerId')
  async index(
    @Param() params: { playerId: string },
    @Query(IndexValidatorQueryPipe) query,
  ): Promise<Challenge[]> {
    return await this.challengeService.findAll(params.playerId, query);
  }

  @Get('/challenge/:id')
  async read(@Param() params: { id: string }): Promise<Challenge> {
    return await this.challengeService.find(params.id);
  }

  @Post('/challenge')
  @UsePipes(ValidationPipe)
  async create(@Body() challenge: CreateChallenge): Promise<void> {
    try {
      const { challengerId, challengedId } = challenge;
      const [challenger, challenged] = await Promise.all([
        this.playerService.find(challengerId),
        this.playerService.find(challengedId),
      ]);

      if (!challenger || !challenged) {
        throw new NotFoundException('Players not found!');
      }

      const { matches, themes, difficulty } = challenge;
      const question = this.questionBuilderService.handle({
        difficulty,
        themes,
        matches,
      });

      const { status, data } = await this.httpService
        .post<GPTResponse>(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: question }],
          },
          {
            headers: {
              Authorization: process.env.OPENAI_API_KEY,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      if (status !== 200) {
        throw new InternalServerErrorException('Internal error');
      }

      const questions = data.choices[0].message.content;

      await this.challengeService.save({
        ...challenge,
        config: {
          matches,
          score: { challenged: 0, challenger: 0 },
          questions: JSON.parse(questions),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/challenge/:id')
  async update(
    @Param() params: { id: string },
    @Body() challenge: UpdateChallenge,
  ): Promise<Challenge> {
    return await this.challengeService.update(params.id, challenge);
  }
}
