import { Injectable } from '@nestjs/common';
import { QuestionBuilderConfig } from './interfaces/config.interface';

@Injectable()
export class QuestionBuilderService {
  get question(): string {
    return 'Crie uma pergunta chamada Q.';
  }

  get answers(): string {
    return 'Crie 4 alternativas chamadas QA,QB,QC,QD para a pergunta Q.';
  }

  get tokensLimit(): string {
    return 'A pergunta deve ter no máximo 40 tokens. Cada alternativa deve ter no máximo 18 tokens.';
  }

  get correct(): string {
    return 'CA deve ser a letra correspondente a alternativa correta.';
  }

  theme(theme: string): string {
    return `O tema da pergunta deve ser ${theme}.`;
  }

  level(level: string): string {
    return `A pergunta deve ter o nível ${level}.`;
  }

  get warnings(): string {
    return 'Essa chamada é feita por uma api. Não retorne nada, nenhum texto. Apenas um';
  }

  get _return(): string {
    return `${this.structureType} conforme a estrutura: ${this.structureData}.`;
  }

  get structureType(): string {
    return 'JSON';
  }

  get structureData(): string {
    return JSON.stringify({
      question: 'Q',
      answers: { a: 'QA', b: 'QB', c: 'QC', d: 'QD' },
      correct: 'CA',
    });
  }

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
    const { difficulty, theme } = config;
    const level = this.dificulty(difficulty);

    return [
      this.question,
      this.answers,
      this.tokensLimit,
      this.correct,
      this.theme(theme),
      this.level(level),
      this.warnings,
      this._return,
    ].join(' ');
  }
}
