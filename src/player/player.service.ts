import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayer } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  private players: Player[] = [];

  async createPlayer(player: CreatePlayer): Promise<void> {
    this.logger.log({ player });
  }
}
