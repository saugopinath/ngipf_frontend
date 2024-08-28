import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWisePfRegisterWithInterestComponent } from './employee-wise-pf-register-with-interest.component';

describe('EmployeeWisePfRegisterWithInterestComponent', () => {
  let component: EmployeeWisePfRegisterWithInterestComponent;
  let fixture: ComponentFixture<EmployeeWisePfRegisterWithInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWisePfRegisterWithInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeWisePfRegisterWithInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
