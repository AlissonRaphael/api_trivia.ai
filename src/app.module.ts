import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
