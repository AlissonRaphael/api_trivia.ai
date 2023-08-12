import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 6000 })],
  controllers: [ChallengeController],
  providers: [ChallengeService, PrismaService],
})
export class ChallengeModule {}
