import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePFBalanceTransferComponent } from './employee-pf-balance-transfer.component';

describe('EmployeePFBalanceTransferComponent', () => {
  let component: EmployeePFBalanceTransferComponent;
  let fixture: ComponentFixture<EmployeePFBalanceTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePFBalanceTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePFBalanceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
