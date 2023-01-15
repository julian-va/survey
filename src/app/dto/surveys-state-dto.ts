import { SurveyAnswerType } from './answer-type';
import { CurrentQuestion } from './current-question';
import { ResponseSurveysDto } from './response-surveys-dto';
import { SurveysDto } from './surveys-dto';

export class SurveysStateDto {
  showDashboard: boolean;
  showNextQuestion: boolean;
  surveyList: SurveysDto[];
  surveySelect: ResponseSurveysDto[];
  currentQuestion: CurrentQuestion[];
  previousQuestion: CurrentQuestion[];

  constructor() {
    (this.showDashboard = false),
      (this.showNextQuestion = false),
      (this.surveyList = []),
      (this.surveySelect = []),
      (this.currentQuestion = []);
    this.previousQuestion = [];
  }
}
