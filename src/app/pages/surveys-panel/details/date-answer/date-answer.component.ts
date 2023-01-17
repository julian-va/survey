import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-date-answer',
  templateUrl: './date-answer.component.html',
  styleUrls: ['./date-answer.component.css'],
})
export class DateAnswerComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  onSaveDate($event: Event) {
    const element = $event.target as HTMLInputElement;
    var re = /-/gi;
    const temp = element.value.replace(re, '/');
    const dateSelect = new Date(temp);
    console.log(temp);
    console.log(dateSelect);
    console.log(dateSelect.toLocaleString());
  }
}
