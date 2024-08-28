import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPaymentApplicationComponent } from './final-payment-application.component';

describe('FinalPaymentApplicationComponent', () => {
  let component: FinalPaymentApplicationComponent;
  let fixture: ComponentFixture<FinalPaymentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPaymentApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPaymentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
