import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Game } from './types/game';
import { ChallengeService } from '../challenge/challenge.service';
import { ConfigType } from '../challenge/dtos/create-challenge-dto';
import { UpdateGame } from './dtos/create-game-dto';

@Controller('api/v1')
export class GameController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get('/game/challengeId')
  async read(@Param() params: { challengeId: string }): Promise<Game[]> {
    const { challengeId } = params;
    const challenge = await this.challengeService.find(challengeId);
    const config = challenge.config as ConfigType;
    const { questions } = config;

    const filteredQuestions = (questions || []).map(
      ({ question, theme, answers }: Game) => ({ question, theme, answers }),
    );

    return filteredQuestions;
  }

  @Put('/game/challengeId')
  async update(
    @Param() params: { challengeId: string },
    @Body() game: UpdateGame,
  ): Promise<void> {
    const { challengedAnswers, challengerAnswers } = game;

    const { challengeId } = params;
    const challenge = await this.challengeService.find(challengeId);
    const config = challenge.config as ConfigType;
    const { questions } = config;

    // TODO
  }
}
