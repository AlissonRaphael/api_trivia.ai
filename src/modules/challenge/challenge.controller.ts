import { Body, Controller, Post } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallenge } from './dtos/create-challenge-dto';

@Controller('api/v1')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post('/challenge')
  async create(@Body() challenge: CreateChallenge): Promise<void> {
    await this.challengeService.save(challenge);
  }
}