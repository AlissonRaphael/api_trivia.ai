export type GPTResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choices[];
  usage: {
    prompt_tokens: string;
    completion_tokens: string;
    total_tokens: number;
  };
};

type Choices = {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
};
