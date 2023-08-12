import {
  Body,
  Controller,
  Get,
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
import { IndexValidatorQueryPipe } from 'src/shared/pipes/index-validator-query.pipe';
import { UpdateChallenge } from './dtos/update-challenge.dto';
import { HttpService } from '@nestjs/axios';

@Controller('api/v1')
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
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
    await this.challengeService.save(challenge);
  }

  @Put('/challenge/:id')
  async update(
    @Param() params: { id: string },
    @Body() challenge: UpdateChallenge,
  ): Promise<Challenge> {
    return await this.challengeService.update(params.id, challenge);
  }
}
