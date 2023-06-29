import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayer } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  private players: Player[] = [];

  async findAll(): Promise<Player[]> {
    return this._findAll();
  }

  async find(id: string): Promise<Player> {
    return this._findById(id);
  }

  async save(player: CreatePlayer): Promise<void> {
    this._save(player);
  }

  async findAll(): Promise<Player[]> {
    return this._findAll();
  }

  private _findAll(): Player[] {
    return this.players;
  }

  private _findById(id: string): Player {
    return this.players.find((player: Player) => player.id === id);
  }

  private _save(player: CreatePlayer): void {
    const { name, email, phone } = player;
    const data: Player = {
      id: uuidV4(),
      name,
      email,
      phone,
      ranking: 'E',
      position: 0,
      avatar: '',
    };
    this.players.push(data);
  }
}
