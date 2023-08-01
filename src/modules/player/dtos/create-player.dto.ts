import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayer {
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  name: string;
}
