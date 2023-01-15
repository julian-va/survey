import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CurrentQuestion } from 'src/app/dto/current-question';
import { ResponseSurveysDto } from 'src/app/dto/response-surveys-dto';
import { SurveysDto } from 'src/app/dto/surveys-dto';
import { SurveysStateDto } from 'src/app/dto/surveys-state-dto';
import { SurveysService } from 'src/app/service/surveys.service';

@Injectable({
  providedIn: 'root',
})
export class SurveysUseCaseService {
  private state = new BehaviorSubject<SurveysStateDto>(new SurveysStateDto());
  state$ = this.state.asObservable();

  constructor(private readonly survaysService: SurveysService) {}

  allSurveys(): Observable<SurveysDto[]> {
    return this.survaysService.getAllSurveys().pipe(
      tap((res) => {
        const temp = this.state.value;
        temp.surveyList = res;
        this.state.next(temp);
      })
    );
  }
  responseBySurveys(surveyId: number): Observable<ResponseSurveysDto[]> {
    return this.survaysService.getResponseBySurveys(surveyId).pipe(
      tap((res) => {
        const temp = this.state.value;
        temp.surveySelect = res;
        this.state.next(temp);
        this.prepareQuestion(true);
      })
    );
  }

  private prepareQuestion(initialQuestion: boolean): void {
    const temp = this.state.value;

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
    this.prepareQuestion(false);
  }

  backQuestion(): void {
    const temp = this.state.value;
    const previousQuestion = temp.previousQuestion.filter(
      (it) => it.nextQuestionId === temp.currentQuestion[0].nextQuestionId
    );
    if (previousQuestion.length > 1) {
      temp.currentQuestion = temp.previousQuestion;
      temp.previousQuestion = previousQuestion;
    } else {
      temp.currentQuestion = temp.previousQuestion;
      temp.previousQuestion = [];
    }
    this.state.next(temp);
  }

  chaceCheckbox(
    answersId: number,
    isChekked: boolean,
    singleChecbox: boolean
  ): void {
    const temp = this.state.value;
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

  saveDate(strDate: string): void {
    const temp = this.state.value;
    temp.currentQuestion.forEach((it) => (it.correctAnswer = strDate));
    this.state.next(temp);
  }
}
