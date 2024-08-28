import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRForFinalPaymentComponent } from './tr-for-final-payment.component';

describe('TRForFinalPaymentComponent', () => {
  let component: TRForFinalPaymentComponent;
  let fixture: ComponentFixture<TRForFinalPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TRForFinalPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TRForFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
