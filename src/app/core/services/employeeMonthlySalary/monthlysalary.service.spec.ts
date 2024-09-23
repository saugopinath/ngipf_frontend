import { TestBed } from '@angular/core/testing';

import { MonthlysalaryService } from './monthlysalary.service';

describe('MonthlysalaryService', () => {
  let service: MonthlysalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlysalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
