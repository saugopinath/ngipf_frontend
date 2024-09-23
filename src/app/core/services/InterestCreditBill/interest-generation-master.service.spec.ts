import { TestBed } from '@angular/core/testing';

import { InterestGenerationMasterService } from './interest-generation-master.service';

describe('InterestGenerationMasterService', () => {
  let service: InterestGenerationMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestGenerationMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
