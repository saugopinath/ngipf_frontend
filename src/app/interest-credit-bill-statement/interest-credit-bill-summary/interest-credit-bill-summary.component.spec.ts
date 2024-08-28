import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreditBillSummaryComponent } from './interest-credit-bill-summary.component';

describe('InterestCreditBillSummaryComponent', () => {
  let component: InterestCreditBillSummaryComponent;
  let fixture: ComponentFixture<InterestCreditBillSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestCreditBillSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestCreditBillSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
