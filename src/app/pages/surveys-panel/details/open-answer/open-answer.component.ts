import { Component } from '@angular/core';
import { SurveysUseCaseService } from '../../surveys-usecase.service';

@Component({
  selector: 'app-open-answer',
  templateUrl: './open-answer.component.html',
  styleUrls: ['./open-answer.component.css'],
})
export class OpenAnswerComponent {
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  onChaceAnswOpen($event: Event): void {
    const element = $event.target as HTMLInputElement;
    const answOpen: string = element.value;
    this.surveysUseCaseService.saveDate(answOpen);
  }
}
