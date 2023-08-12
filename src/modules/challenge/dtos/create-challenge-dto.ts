import { IsNotEmpty } from 'class-validator';
import { Difficulty } from '../types/difficulty';

export class CreateChallenge {
  @IsNotEmpty()
  challengerId: string;

  @IsNotEmpty()
  challengedId: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  difficulty: Difficulty;

  @IsNotEmpty()
  config: Config;
}

type Config = {
  matches: number;
  questions: Question[];
  winner: string | null;
  score: { challenged: number; challenger: number };
};

type Question = {
  question: string;
  answers: { a: string; b: string; c: string; d: string };
  correctAlternative: number;
};
