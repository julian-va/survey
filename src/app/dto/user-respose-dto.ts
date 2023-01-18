export interface UserResposeDto {
  UserResponsesId?: number;
  userId: number;
  surveyId: number;
  answersId: number;
  answerDescription?: string;
  createAt?: Date;
}
