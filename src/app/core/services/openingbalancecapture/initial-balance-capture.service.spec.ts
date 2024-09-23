import { TestBed } from '@angular/core/testing';

import { InitialBalanceCaptureService } from './initial-balance-capture.service';

describe('InitialBalanceCaptureService', () => {
  let service: InitialBalanceCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialBalanceCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
