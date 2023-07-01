import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayer } from './dtos/create-player.dto';
import { UpdatePlayer } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  private players: Player[] = [];

  async findAll(): Promise<Player[]> {
    return this._findAll();
  }

  async find(email: string): Promise<Player> {
    const index = this._find('email', email);
    return this.players[index];
  }

  async save(player: CreatePlayer): Promise<void> {
    this._save(player);
  }

  async destroy(id: string): Promise<void> {
    this._destroy(id);
  }

  private _findAll(): Player[] {
    return this.players;
  }

  private _find(key: string, value: string): number {
    const index = this.players.findIndex((player: Player) => {
      return player[key] === value;
    });

    if (index === -1) {
      throw new NotFoundException('user not found');
    }

    return index;
  }

  async update(playerId: string, player: UpdatePlayer): Promise<Player> {
    return this._update(playerId, player);
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

  private _update(playerId: string, player: UpdatePlayer): Player {
    const index = this._find('id', playerId);
    const { id, email, phone } = this.players[index];
    this.players[index] = { id, email, phone, ...player };
    return this.players[index];
  }

  private _destroy(id: string): void {
    const index = this._find('id', id);
    this.players.splice(index, 1);
  }
}
