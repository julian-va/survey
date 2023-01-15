import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-date-answer',
  templateUrl: './date-answer.component.html',
  styleUrls: ['./date-answer.component.css'],
})
export class DateAnswerComponent {
  state$ = this.surveysUseCaseService.state$;
  dateSelect: Date;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {
    this.dateSelect = new Date('2023/01/30');
  }

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
