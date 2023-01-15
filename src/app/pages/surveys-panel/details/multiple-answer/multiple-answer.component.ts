import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-multiple-answer',
  templateUrl: './multiple-answer.component.html',
  styleUrls: ['./multiple-answer.component.css'],
})
export class MultipleAnswerComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  onChaceCheckbox($event: Event): void {
    const element = $event.target as HTMLInputElement;
    const answersId: number = Number.parseInt(element.value);
    const isChekked: boolean = element.checked;
    this.surveysUseCaseService.chaceCheckbox(answersId, isChekked, false);
  }
}
