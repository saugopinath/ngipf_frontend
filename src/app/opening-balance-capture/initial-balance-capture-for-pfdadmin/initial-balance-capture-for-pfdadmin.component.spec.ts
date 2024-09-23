import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialBalanceCaptureForPFDAdminComponent } from './initial-balance-capture-for-pfdadmin.component';

describe('InitialBalanceCaptureForPFDAdminComponent', () => {
  let component: InitialBalanceCaptureForPFDAdminComponent;
  let fixture: ComponentFixture<InitialBalanceCaptureForPFDAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialBalanceCaptureForPFDAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialBalanceCaptureForPFDAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
