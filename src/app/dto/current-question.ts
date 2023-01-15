export interface CurrentQuestion {
  answersId: number;
  questionId: number;
  nextQuestionId?: number;
  correctAnswer?: string;
  answerType: string;
  questionDetail: string;
  questionOrder: number;
  isChekked: boolean;
}
