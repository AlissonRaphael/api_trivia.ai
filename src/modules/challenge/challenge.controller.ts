import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Challenge } from '@prisma/client';
import { ChallengeService } from './challenge.service';
import { CreateChallenge } from './dtos/create-challenge-dto';
import { IndexValidatorQueryPipe } from 'src/shared/pipes/index-validator-query.pipe';

@Controller('api/v1')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get('/challenges/:playerId')
  async index(
    @Param() params: { playerId: string },
    @Query(IndexValidatorQueryPipe) query,
  ): Promise<Challenge[]> {
    return await this.challengeService.findAll(params.playerId, query);
  }

  @Post('/challenge')
  async create(@Body() challenge: CreateChallenge): Promise<void> {
    await this.challengeService.save(challenge);
  }
}
