import { TestBed } from '@angular/core/testing';

import { OpeningbalancecaptureService } from './openingbalancecapture.service';

describe('OpeningbalancecaptureService', () => {
  let service: OpeningbalancecaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningbalancecaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
