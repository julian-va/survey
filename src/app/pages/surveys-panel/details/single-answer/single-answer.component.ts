import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.css'],
})
export class SingleAnswerComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  onChaceCheckbox($event: Event): void {
    const element = $event.target as HTMLInputElement;
    const answersId: number = Number.parseInt(element.value);
    const isChekked: boolean = element.checked;
    this.surveysUseCaseService.chaceCheckbox(answersId, isChekked, true);
  }
}
