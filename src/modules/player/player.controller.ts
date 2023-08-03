import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Player } from '@prisma/client';

import { CreatePlayer } from './dtos/create-player.dto';
import { UpdatePlayer } from './dtos/update-player.dto';
import { PlayerService } from './player.service';
import { PlayerValidatorParamsPipe } from './pipes/player-validator-params.pipe';

@Controller('api/v1')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/players')
  async index(@Query(PlayerValidatorParamsPipe) query): Promise<Player[]> {
    return await this.playerService.findAll(query);
  }

  @Get('/player/:id')
  async read(@Param() params: { id: string }): Promise<Player> {
    return await this.playerService.find(params.id);
  }

  @Post('/player')
  @UsePipes(ValidationPipe)
  async create(@Body() player: CreatePlayer) {
    await this.playerService.save(player);
  }

  @Put('/player/:id')
  async update(
    @Param() params: { id: string },
    @Body() player: UpdatePlayer,
  ): Promise<Player> {
    return await this.playerService.update(params.id, player);
  }

  @Delete('/player/:id')
  async delete(@Param() params: { id: string }): Promise<void> {
    await this.playerService.destroy(params.id);
  }
}
