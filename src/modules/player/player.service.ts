import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlayer } from './dtos/update-player.dto';
import { CreatePlayer } from './dtos/create-player.dto';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(query: { page: number; size: number }): Promise<Player[]> {
    const { size, page } = query;
    return await this.prisma.player.findMany({
      take: size,
      skip: (page - 1) * size,
    });
  }

  async find(id: string): Promise<Player> {
    const player = await this.prisma.player.findUnique({ where: { id } });

    if (!player) {
      throw new NotFoundException('Player not found!');
    }

    return player;
  }

  async save(player: CreatePlayer): Promise<void> {
    await this.prisma.player.create({
      data: player as Prisma.PlayerCreateInput,
    });
  }

  async update(id: string, player: UpdatePlayer): Promise<Player> {
    await this.find(id);
    return await this.prisma.player.update({
      where: { id },
      data: player as Prisma.PlayerUpdateInput,
    });
  }

  async destroy(id: string): Promise<void> {
    await this.find(id);
    await this.prisma.player.delete({ where: { id } });
  }
}
