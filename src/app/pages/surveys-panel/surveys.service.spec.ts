import { TestBed } from '@angular/core/testing';

import { SurveysService } from './surveys-usecase.service';

describe('SurveysService', () => {
  let service: SurveysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
