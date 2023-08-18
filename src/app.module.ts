import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [PlayerModule, ChallengeModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
