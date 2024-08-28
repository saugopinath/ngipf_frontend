import { TestBed } from '@angular/core/testing';

import { StakeHolderService } from './stake-holder.service';

describe('StakeHolderService', () => {
  let service: StakeHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
