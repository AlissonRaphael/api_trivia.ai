import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { PrismaService } from '../../shared/database/prisma/prisma.service';
import { ChallengeService } from '../challenge/challenge.service';

@Module({
  controllers: [GameController],
  providers: [PrismaService, ChallengeService],
})
export class GameModule {}
