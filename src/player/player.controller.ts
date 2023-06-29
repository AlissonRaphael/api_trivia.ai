import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreatePlayer } from './dtos/create-player.dto';
import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async index(): Promise<Player[]> {
    return await this.playerService.findAll();
  }

  @Get('/:id')
  async read(@Param() params: { id: string }): Promise<Player> {
    return await this.playerService.find(params.id);
  }

  @Post()
  async create(@Body() player: CreatePlayer) {
    await this.playerService.save(player);
  }

  @Get('/:id')
  async read(@Param() param: { id: string }): Promise<string> {
    return JSON.stringify({ id: param.id });
  }
}
