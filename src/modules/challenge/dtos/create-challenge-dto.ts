import { IsNotEmpty } from 'class-validator';

export class CreateChallenge {
  @IsNotEmpty()
  challengerId: string;

  @IsNotEmpty()
  challengedId: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  config: string;
}
