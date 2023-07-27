import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Players } from '@prisma/client';

import { CreatePlayer } from './dtos/create-player.dto';
import { UpdatePlayer } from './dtos/update-player.dto';
import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/players')
  async index(@Query() query: { page: number }): Promise<Players[]> {
    return await this.playerService.findAll();
  }

  @Get('/player')
  async read(@Body() player: { email: string }): Promise<Players> {
    return await this.playerService.find(player.email);
  }

  @Post('/player')
  async create(@Body() player: CreatePlayer) {
    await this.playerService.save(player);
  }

  @Put('/player/:id')
  async update(
    @Param() params: { id: string },
    @Body() player: UpdatePlayer,
  ): Promise<Players> {
    return await this.playerService.update(params.id, player);
  }

  @Delete('/player/:id')
  async delete(@Param() params: { id: string }): Promise<void> {
    await this.playerService.destroy(params.id);
  }
}
