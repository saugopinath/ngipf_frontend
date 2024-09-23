import { TestBed } from '@angular/core/testing';

import { BasicDtlServiceService } from './basic-dtl-service.service';

describe('BasicDtlServiceService', () => {
  let service: BasicDtlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicDtlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
