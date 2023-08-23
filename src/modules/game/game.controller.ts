import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Challenge } from '@prisma/client';
import { Game } from './types/game';
import { UpdateGame } from './dtos/create-game-dto';
import { GameService } from './game.service';

@Controller('api/v1')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/game/challengeId')
  async read(@Param() params: { challengeId: string }): Promise<Game[]> {
    const { challengeId } = params;
    return await this.gameService.find(challengeId);
  }

  @Put('/game/challengeId')
  async update(
    @Param() params: { challengeId: string },
    @Body() game: UpdateGame,
  ): Promise<Challenge> {
    const { challengeId } = params;
    return await this.gameService.update(challengeId, game);
  }
}
