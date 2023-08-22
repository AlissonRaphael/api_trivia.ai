export interface UpdateGame {
  challengerAnswers: AnswersStatus[];
  challengedAnswers: AnswersStatus[];
  status: string[];
}

type AnswersStatus = {
  questionId: string;
  selected: string;
  time: string;
};
