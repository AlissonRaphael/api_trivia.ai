import { IsNotEmpty } from 'class-validator';

export class CreateChallenge {
  @IsNotEmpty()
  challengerId: string;

  @IsNotEmpty()
  challengedId: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  matches: number;

  @IsNotEmpty()
  themes: string[];

  @IsNotEmpty()
  difficulty: number;

  config?: Config;
}

type Config = {
  matches: number;
  questions: Question[];
  winner?: string;
  score?: { challenged: number; challenger: number };
};

type Question = {
  theme: string;
  question: string;
  answers: { a: string; b: string; c: string; d: string };
  correctAlternative: number;
};
