import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../surveys-usecase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  onNextQuestion(): void {
    this.surveysUseCaseService.nextQuestion();
  }

  onSaveSAurveys(): void {
    this.surveysUseCaseService.saveSurvey();
    console.log('me guardannnnnnn');
  }

  onBack(): void {
    this.surveysUseCaseService.backQuestion();
  }
}
