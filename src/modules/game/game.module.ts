import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

@Module({
  controllers: [GameController],
  providers: [PrismaService],
})
export class GameModule {}
