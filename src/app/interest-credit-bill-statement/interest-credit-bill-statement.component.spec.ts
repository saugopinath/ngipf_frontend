import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreditBillStatementComponent } from './interest-credit-bill-statement.component';

describe('InterestCreditBillStatementComponent', () => {
  let component: InterestCreditBillStatementComponent;
  let fixture: ComponentFixture<InterestCreditBillStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestCreditBillStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestCreditBillStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
