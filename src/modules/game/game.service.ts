import { Injectable, Logger } from '@nestjs/common';

import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Challenge } from '@prisma/client';
import { Game } from './types/game';
import { ChallengeService } from '../challenge/challenge.service';
import { ConfigType } from '../challenge/dtos/create-challenge-dto';
import { UpdateGame } from './dtos/create-game-dto';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  constructor(private readonly challengeService: ChallengeService) {}

  async find(challengeId: string): Promise<Game[]> {
    const challenge = await this.challengeService.find(challengeId);
    const config = challenge.config as ConfigType;
    const { questions = [] } = config;

    return questions.map(({ id, question, answers, theme }: Game) => ({
      id,
      question,
      answers,
      theme,
    }));
  }

  async update(challengeId: string, game: UpdateGame): Promise<Challenge> {
    const { challengedAnswers, challengerAnswers } = game;

    const challenge = await this.challengeService.find(challengeId);
    const config = challenge.config as ConfigType;
    const { questions = [] } = config;

    const questionMapping = {};
    questions.forEach(({ id, correct }) => (questionMapping[id] = correct));
    const challengerAnswersMap = new ArrayMapping(challengerAnswers);

    let challenged = 0;
    let challenger = 0;
    challengedAnswers.map(({ questionId, selected, time }) => {
      const correct = questionMapping[questionId];
      const challengerAnswer = challengerAnswersMap[questionId].selected;

      if (selected === correct && challengerAnswer === correct) {
        if (time > challengerAnswersMap[questionId].time) {
          challenged += 1;
        } else {
          challenger += 1;
        }
      } else if (selected === correct) {
        challenged += 1;
      } else if (challengerAnswer === correct) {
        challenger += 1;
      }
    });

    let winner = '';
    if (challenged !== challenger) {
      winner = challenged > challenger ? 'challenged' : 'challenger';
    } else {
      winner = 'tied';
    }

    return await this.challengeService.update(challengeId, {
      status: 'closed',
      config: {
        ...config,
        winner,
        score: { challenged, challenger },
      } as ConfigType,
    });
  }
}

class ArrayMapping extends Array {
  constructor(answers) {
    super();
    for (const { questionId, ...rest } of answers) {
      this[questionId] = rest;
      this.push({ questionId, ...rest });
    }
  }
}
