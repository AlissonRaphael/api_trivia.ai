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
    return `Crie ${matches} questões chamadas Q0;Q1;...Qn com 4 alternativas chamadas Q0a,Q0b,Q0c,Q0d para Q0; ...Qna,Qnb,Qnc,Qnd para Qn. Cada pergunta deve ter no máximo 40 tokens. Cada alternativa deve ter no máximo 15 tokens. A alternativa correta deve se chamar Q0_C para Q0; Q1_C para Q1; Qn_C para Qn. As perguntas devem ter o nível ${level}. Os temas das perguntas devem ser: ${themes.join(' T, ')}. Não retorne NADA. APENAS um array de objetos Javascript na estrutura ${JSON.stringify(DATA)} substituindo os valores correspondentes.`
  }
}

const DATA = [
  {
    question: 'Q0',
    answers: { a: 'Q0a', b: 'Q0b', c: 'Q0c', d: 'Q0d' },
    correct: 'Q0_C',
    theme: 'T',
  },
  {
    question: 'Qn',
    answers: { a: 'Qna', b: 'Qnb', c: 'Qnc', d: 'Qnd' },
    correct: 'Qn_C',
    theme: 'T',
  },
];
