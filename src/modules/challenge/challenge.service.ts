import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge, Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/database/prisma/prisma.service';
import { CreateChallenge } from './dtos/create-challenge-dto';
import { UpdateChallenge } from './dtos/update-challenge.dto';

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

  async update(id: string, challenge: UpdateChallenge): Promise<Challenge> {
    await this.find(id);

    const { status, config } = challenge;

    return await this.prismaService.challenge.update({
      where: { id },
      data: { status, config } as Prisma.ChallengeUpdateInput,
    });
  }
}
