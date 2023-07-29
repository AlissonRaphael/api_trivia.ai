import { Injectable, Logger } from '@nestjs/common';
import { Player, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlayer } from './dtos/update-player.dto';
import { CreatePlayer } from './dtos/create-player.dto';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Player[]> {
    return await this.prisma.player.findMany();
  }

  async find(id: string): Promise<Player> {
    return await this.prisma.player.findUnique({ where: { id } });
  }

  async save(player: CreatePlayer): Promise<void> {
    await this.prisma.player.create({
      data: player as Prisma.PlayerCreateInput,
    });
  }

  async update(id: string, player: UpdatePlayer): Promise<Player> {
    return await this.prisma.player.update({
      where: { id },
      data: player as Prisma.PlayerUpdateInput,
    });
  }

  async destroy(id: string): Promise<void> {
    await this.prisma.player.delete({ where: { id } });
  }
}
