import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SurveysDto } from '../dto/surveys-dto';
import { ResponseSurveysDto } from '../dto/response-surveys-dto';

@Injectable({
  providedIn: 'root',
})
export class SurveysService {
  private URL = {
    surveysAll: `${environment.urlBackend}/surveys`,
    responseBySurveys: `${environment.urlBackend}/answers/responseBySurveys/`,
  };
  constructor(private readonly httpClient: HttpClient) {}

  getAllSurveys(): Observable<SurveysDto[]> {
    return this.httpClient.get<SurveysDto[]>(this.URL.surveysAll);
  }

  getResponseBySurveys(surveyId: number): Observable<ResponseSurveysDto[]> {
    return this.httpClient.get<ResponseSurveysDto[]>(
      `${this.URL.responseBySurveys}${surveyId}`
    );
  }
}
