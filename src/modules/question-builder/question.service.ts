import { Injectable } from '@nestjs/common';
import { QuestionBuilderConfig } from './interfaces/config.interface';

@Injectable()
export class QuestionBuilderService {
  dificulty(index: number): string {
    return [
      'ensino básico',
      'ensino fundamental',
      'ensino médio',
      'graduação universitária',
      'doutorado e phd',
    ][index - 1];
  }

  handle(config: QuestionBuilderConfig): string {
    const { difficulty, matches, themes } = config;
    const level = this.dificulty(difficulty);
    return `Crie ${matches} perguntas com 4 alternativas enumeradas de A á B. Cada pergunta deve ter no máximo 45 tokens. Cada alternativa deve ter no máximo 20 tokens. As perguntas devem ter o nível ${level}. Os temas das perguntas devem ser: ${themes.join(', ')}. Não retorne NADA. APENA um array de objetos Javascript na estrutura: ${OBJECT}`
  }
}

const OBJECT = {
  "theme": "(tema1)",
  "question": "(questão1)",
  "answers": { "a": "(opção1)", "b": "(opção2)", "c": "(opção3)", "d": "(opção4)" },
  "correctAlternative": "(letraCorreta)"
};
