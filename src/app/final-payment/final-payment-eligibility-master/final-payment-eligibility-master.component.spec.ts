import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPaymentEligibilityMasterComponent } from './final-payment-eligibility-master.component';

describe('FinalPaymentEligibilityMasterComponent', () => {
  let component: FinalPaymentEligibilityMasterComponent;
  let fixture: ComponentFixture<FinalPaymentEligibilityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPaymentEligibilityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPaymentEligibilityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
