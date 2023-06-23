import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreatePlayer } from './dtos/create-player.dto';

@Controller('api/v1/player')
export class PlayerController {
  @Get()
  async index() {
    return JSON.stringify({ nome: 'Alisson' });
  }

  @Post()
  async create(@Body() player: CreatePlayer) {
    const { name } = player;
    return JSON.stringify({ message: `Welcome ${name}!` });
  }
}
