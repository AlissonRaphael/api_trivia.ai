export class UpdateChallenge {
  status?: string;
  config?: Config;
}

type Config = {
  matches: number;
  questions: Question[];
  winner?: string | null;
  score?: { challenged: number; challenger: number };
};

type Question = {
  question: string;
  answers: { a: string; b: string; c: string; d: string };
  correctAlternative: number;
};
