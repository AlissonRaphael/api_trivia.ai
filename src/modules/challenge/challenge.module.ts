import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { PrismaService } from '../../shared/database/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { PlayerService } from '../player/player.service';
import { QuestionBuilderService } from '../question-builder/question.service';

@Module({
  imports: [HttpModule.register({ timeout: 30000 })],
  controllers: [ChallengeController],
  providers: [
    PrismaService,
    ChallengeService,
    PlayerService,
    QuestionBuilderService,
  ],
})
export class ChallengeModule {}
