import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-numerical-answer',
  templateUrl: './numerical-answer.component.html',
  styleUrls: ['./numerical-answer.component.css'],
})
export class NumericalAnswerComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}
}
