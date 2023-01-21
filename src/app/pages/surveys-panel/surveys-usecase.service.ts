import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SurveyAnswerType } from 'src/app/dto/answer-type';
import { CurrentQuestion } from 'src/app/dto/current-question';
import { ErrorDto } from 'src/app/dto/error-dto';
import { ResponseSurveysDto } from 'src/app/dto/response-surveys-dto';
import { SurveysDto } from 'src/app/dto/surveys-dto';
import { SurveysStateDto } from 'src/app/dto/surveys-state-dto';
import { UserResposeDto } from 'src/app/dto/user-respose-dto';
import { SurveysService } from 'src/app/service/surveys.service';

@Injectable({
  providedIn: 'root',
})
export class SurveysUseCaseService {
  private state = new BehaviorSubject<SurveysStateDto>(new SurveysStateDto());
  state$ = this.state.asObservable();

  constructor(private readonly survaysService: SurveysService) {}

  ///////// methods that interact with the backend //////////
  allSurveys(): Observable<SurveysDto[]> {
    return this.survaysService.getAllSurveys().pipe(
      tap((res) => {
        const temp = this.state.getValue();
        temp.surveyList = res;
        this.state.next(temp);
      })
    );
  }
  responseBySurveys(surveyId: number): Observable<ResponseSurveysDto[]> {
    return this.survaysService.getResponseBySurveys(surveyId).pipe(
      tap((res) => {
        const temp = this.state.getValue();
        temp.surveySelect = res;
        this.state.next(temp);
        this.prepareQuestion(true);
      })
    );
  }

  saveSurvey() {
    const temp = this.state.getValue();
    this.survaysService
      .postSaveSurvey(this.userResposeDto(temp.surveyToSave))
      .subscribe((res) => {
        this.resetState(temp);
      });
  }
  ///////// methods that interact with the backend //////////
  private prepareQuestion(initialQuestion: boolean): void {
    const temp = this.state.getValue();

    const temp2 = initialQuestion
      ? temp.surveySelect.filter((it) => it.questionOrder === 1)
      : temp.surveySelect.filter(
          (it) => it.questionId === temp.currentQuestion[0].nextQuestionId
        );

    if (temp2.length > 0) {
      temp.previousQuestion = initialQuestion
        ? temp.previousQuestion
        : temp.currentQuestion;
      temp.currentQuestion = this.prepareCurrentQuestion(temp2);
      temp.showDashboard = true;
      temp.showNextQuestion = true;
      this.state.next(temp);
    } else {
      temp.showNextQuestion = false;
      this.state.next(temp);
    }
  }

  private prepareCurrentQuestion(
    surveySelect: ResponseSurveysDto[]
  ): CurrentQuestion[] {
    return surveySelect.map((it) => {
      let temp3: CurrentQuestion = {
        answersId: it.answersId,
        answerType: it.answerType,
        questionDetail: it.questionDetail,
        questionId: it.questionId,
        questionOrder: it.questionOrder,
        correctAnswer: it.correctAnswer,
        nextQuestionId: it.nextQuestionId,
        isChekked: false,
      };
      return temp3;
    });
  }

  nextQuestion(): void {
    const temp = this.state.getValue();
    try {
      if (temp.showNextQuestion) {
        switch (temp.currentQuestion[0].answerType) {
          case SurveyAnswerType.DATE_ANSWER:
            this.prepareSaveQuestionCorrectAnswer(temp);
            break;
          case SurveyAnswerType.MULTIPLE_ANSWER:
            this.prepareSaveQuestion(temp);
            break;
          case SurveyAnswerType.NUMERICAL_ANSWER:
            this.prepareSaveQuestionCorrectAnswer(temp);
            break;
          case SurveyAnswerType.OPEN_ANSWER:
            this.prepareSaveQuestionCorrectAnswer(temp);
            break;
          case SurveyAnswerType.SINGLE_ANSWER:
            this.prepareSaveQuestion(temp);
            break;
          default:
            break;
        }
        this.prepareQuestion(false);
      }
    } catch (error) {
      console.log(temp.errorQuestion[0]);
    }
  }

  private prepareSaveQuestionCorrectAnswer(surveysState: SurveysStateDto) {
    if (!!!surveysState.currentQuestion[0].correctAnswer) {
      const err: ErrorDto = {
        message: 'Debe agregar un valor a la respuesta',
        question: surveysState.currentQuestion[0].questionDetail,
        typeQuestion: surveysState.currentQuestion[0].answerType,
      };
      surveysState.errorQuestion = [];
      surveysState.errorQuestion.push(err);
      this.state.next(surveysState);
      throw new Error();
    }

    const temp: ResponseSurveysDto = {
      answersId: surveysState.currentQuestion[0].answersId,
      answerType: surveysState.currentQuestion[0].answerType,
      correctAnswer: surveysState.currentQuestion[0].correctAnswer,
      questionId: surveysState.currentQuestion[0].questionId,
      questionOrder: surveysState.currentQuestion[0].questionOrder,
      questionDetail: surveysState.currentQuestion[0].questionDetail,
      surveyId: surveysState.surveySelect[0].surveyId,
      surveyName: surveysState.surveySelect[0].surveyName,
      nextQuestionId: surveysState.currentQuestion[0].nextQuestionId,
    };

    surveysState.surveyToSave.push(temp);
    surveysState.previousQuestionHistory.push(surveysState.currentQuestion[0]);
    this.state.next(surveysState);
  }

  private prepareSaveQuestion(surveysState: SurveysStateDto) {
    const temp = surveysState.currentQuestion.filter(
      (it) => it.isChekked === true
    );

    if (temp.length < 1) {
      const err: ErrorDto = {
        message: 'Debe elegir al menos una opcion',
        question: surveysState.currentQuestion[0].questionDetail,
        typeQuestion: surveysState.currentQuestion[0].answerType,
      };
      surveysState.errorQuestion = [];
      surveysState.errorQuestion.push(err);
      this.state.next(surveysState);
      throw new Error();
    }

    temp.forEach((it) => {
      const temp1: ResponseSurveysDto = {
        answersId: it.answersId,
        answerType: it.answerType,
        correctAnswer: it.correctAnswer,
        questionId: it.questionId,
        questionOrder: it.questionOrder,
        questionDetail: it.questionDetail,
        surveyId: surveysState.surveySelect[0].surveyId,
        surveyName: surveysState.surveySelect[0].surveyName,
        nextQuestionId: it.nextQuestionId,
      };
      surveysState.surveyToSave.push(temp1);
    });

    surveysState.currentQuestion.forEach((it) =>
      surveysState.previousQuestionHistory.push(it)
    );

    this.state.next(surveysState);
  }

  backQuestion(): void {
    const temp = this.state.getValue();

    if (temp.previousQuestionHistory.length > 0) {
      const questionToDelete = temp.surveyToSave.filter(
        (it) => it.questionId === temp.currentQuestion[0].questionId
      );
      questionToDelete.forEach((it) => {
        const index = temp.surveyToSave.findIndex(
          (survey) => survey.questionId === it.questionId
        );
        if (index > 0) {
          temp.surveyToSave.slice(index, 1);
        }
      });

      const previousQuestion = temp.previousQuestionHistory.filter(
        (it) => it.nextQuestionId === temp.previousQuestion[0].questionId
      );

      if (previousQuestion.length > 0) {
        temp.currentQuestion = temp.previousQuestion;
        temp.previousQuestion = previousQuestion;
        temp.showNextQuestion = true;

        previousQuestion.forEach((it) => {
          const index = temp.previousQuestionHistory.findIndex(
            (survey) => survey.questionId === it.questionId
          );
          if (index > 0) {
            temp.previousQuestionHistory.slice(index, 1);
          }
        });
      } else {
        temp.currentQuestion = temp.previousQuestion;
        temp.previousQuestion = [];
        temp.previousQuestionHistory = [];
        temp.surveyToSave = [];
      }
      this.state.next(temp);
    }
  }

  chaceCheckbox(
    answersId: number,
    isChekked: boolean,
    singleChecbox: boolean
  ): void {
    const temp = this.state.getValue();
    temp.currentQuestion = temp.currentQuestion.map((it) => {
      if (singleChecbox) {
        it.isChekked = answersId === it.answersId ? isChekked : false;
      } else {
        it.isChekked = answersId === it.answersId ? isChekked : it.isChekked;
      }
      return it;
    });
    this.state.next(temp);
  }

  saveDate(answer: string, dateStr: string = ''): void {
    const temp = this.state.getValue();
    temp.currentQuestion.forEach(
      (it) => (
        (it.correctAnswer = answer),
        (it.dataStr = dateStr.length > 0 ? dateStr : it.dataStr)
      )
    );

    this.state.next(temp);
  }

  private userResposeDto(surveyToSave: ResponseSurveysDto[]): UserResposeDto[] {
    const res = surveyToSave.map((it) => {
      const temp: UserResposeDto = {
        answerDescription: it.correctAnswer,
        answersId: it.answersId,
        surveyId: it.surveyId,
        userId: 1,
      };
      return temp;
    });
    return res;
  }
  private resetState(state: SurveysStateDto): void {
    state.currentQuestion = [];
    state.errorQuestion = [];
    state.previousQuestion = [];
    state.previousQuestionHistory = [];
    state.showDashboard = false;
    state.showNextQuestion = false;
    state.surveySelect = [];
    state.surveyToSave = [];
    this.state.next(state);
  }
}
