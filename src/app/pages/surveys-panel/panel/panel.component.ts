import { Component, OnInit } from '@angular/core';
import { SurveysUseCaseService } from '../surveys-usecase.service';
import { SurveysDto } from 'src/app/dto/surveys-dto';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  surveys: SurveysDto[] = [];
  state$ = this.surveysUseCaseService.state$;

  constructor(private readonly surveysUseCaseService: SurveysUseCaseService) {}

  ngOnInit(): void {
    this.surveysUseCaseService.allSurveys().subscribe();
  }

  surveyById(surveyId: number): void {
    this.surveysUseCaseService.responseBySurveys(surveyId).subscribe();
  }
}
