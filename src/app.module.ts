import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { ChallengeModule } from './modules/challenge/challenge.module';

@Module({
  imports: [PlayerModule, ChallengeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
