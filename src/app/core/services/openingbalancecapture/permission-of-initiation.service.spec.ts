import { TestBed } from '@angular/core/testing';

import { PermissionOfInitiationService } from './permission-of-initiation.service';

describe('PermissionOfInitiationService', () => {
  let service: PermissionOfInitiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionOfInitiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
