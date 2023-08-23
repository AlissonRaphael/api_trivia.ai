import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { PrismaService } from '../../shared/database/prisma/prisma.service';
import { ChallengeService } from '../challenge/challenge.service';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService, ChallengeService],
})
export class GameModule {}
