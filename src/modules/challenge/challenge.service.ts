import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateChallenge } from './dtos/create-challenge-dto';

@Injectable()
export class ChallengeService {
  constructor(private prismaService: PrismaService) {}

  async findAll(
    playerId: string,
    query: { page: number; size: number },
  ): Promise<Challenge[]> {
    const { page, size } = query;
    return await this.prismaService.challenge.findMany({
      take: size,
      skip: (page - 1) * size,
      where: {
        PlayerChallenge: {
          some: {
            playerId,
          },
        },
      },
    });
  }

  async find(id: string): Promise<Challenge> {
    const challenge = await this.prismaService.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge not found!');
    }

    return challenge;
  }

  async save(challenge: CreateChallenge): Promise<void> {
    const { challengerId, challengedId, status, config } = challenge;
    const [challenger, challenged] = await Promise.all([
      this.prismaService.player.findUnique({ where: { id: challengerId } }),
      this.prismaService.player.findUnique({ where: { id: challengedId } }),
    ]);

    if (!challenger || !challenged) {
      throw new NotFoundException('Players not found!');
    }

    await this.prismaService.challenge.create({
      data: {
        status,
        config,
        PlayerChallenge: {
          create: [{ playerId: challengerId }, { playerId: challengedId }],
        },
      },
    });
  }
}
