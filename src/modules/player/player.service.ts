import { Injectable, Logger } from '@nestjs/common';
import { Players, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Players[]> {
    return await this.prisma.players.findMany();
  }

  async find(email: string): Promise<Players> {
    return await this.prisma.players.findUnique({ where: { email } });
  }

  async save(player: Prisma.PlayersCreateInput): Promise<void> {
    await this.prisma.players.create({ data: player });
  }

  async update(
    id: string,
    player: Prisma.PlayersUpdateInput
  ): Promise<Players> {
    return await this.prisma.players.update({
      where: { id },
      data: player,
    });
  }

  async destroy(id: string): Promise<void> {
    await this.prisma.players.delete({ where: { id } });
  }
}
