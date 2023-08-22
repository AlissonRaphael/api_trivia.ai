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

  config?: ConfigType;
}

export type ConfigType = {
  matches: number;
  questions: Question[];
  winner?: string;
  score?: { challenged: number; challenger: number };
};

export type Question = {
  id: string;
  theme: string;
  question: string;
  answers: { a: string; b: string; c: string; d: string };
  correct: string;
};
