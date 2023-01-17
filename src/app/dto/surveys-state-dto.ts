import { CurrentQuestion } from './current-question';
import { ErrorDto } from './error-dto';
import { ResponseSurveysDto } from './response-surveys-dto';
import { SurveysDto } from './surveys-dto';

export class SurveysStateDto {
  showDashboard: boolean;
  showNextQuestion: boolean;
  surveyList: SurveysDto[];
  surveySelect: ResponseSurveysDto[];
  currentQuestion: CurrentQuestion[];
  previousQuestion: CurrentQuestion[];
  previousQuestionHistory: CurrentQuestion[];
  surveyToSave: ResponseSurveysDto[];
  errorQuestion: ErrorDto[];

  constructor() {
    this.showDashboard = false;
    this.showNextQuestion = false;
    this.surveyList = [];
    this.surveySelect = [];
    this.currentQuestion = [];
    this.previousQuestion = [];
    this.surveyToSave = [];
    this.errorQuestion = [];
    this.previousQuestionHistory = [];
  }
}
