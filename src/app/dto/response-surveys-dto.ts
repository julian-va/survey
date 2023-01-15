export interface ResponseSurveysDto {
  answersId: number;
  questionId: number;
  nextQuestionId?: number;
  correctAnswer?: string;
  answerType: string;
  questionDetail: string;
  questionOrder: number;
  surveyId: number;
  surveyName: string;
}
