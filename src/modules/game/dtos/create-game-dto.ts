export interface UpdateGame {
  challengerAnswers: AnswersStatus[];
  challengedAnswers: AnswersStatus[];
  status: string[];
}

type AnswersStatus = {
  question: string;
  selectedAlternative: string;
  time: string;
};
