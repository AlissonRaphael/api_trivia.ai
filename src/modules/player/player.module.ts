import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PlayerService, PrismaService],
})
export class PlayerModule {}
