import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
