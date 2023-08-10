import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateChallenge } from './dtos/create-challenge-dto';

@Injectable()
export class ChallengeService {
  constructor(private prismaService: PrismaService) {}

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
