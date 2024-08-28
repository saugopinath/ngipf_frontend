import { TestBed } from '@angular/core/testing';

import { CapturePFInterestYearService  } from './capture-pfinterest-year.service';

describe('CapturePFInterestYearService', () => {
  let service: CapturePFInterestYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturePFInterestYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
