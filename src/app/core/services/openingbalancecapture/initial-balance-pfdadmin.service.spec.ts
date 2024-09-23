import { TestBed } from '@angular/core/testing';

import { InitialBalancePFDAdminService } from './initial-balance-pfdadmin.service';

describe('InitialBalancePFDAdminService', () => {
  let service: InitialBalancePFDAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialBalancePFDAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
