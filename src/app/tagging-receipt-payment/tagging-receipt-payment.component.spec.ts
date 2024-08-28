import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingReceiptPaymentComponent } from './tagging-receipt-payment.component';

describe('TaggingReceiptPaymentComponent', () => {
  let component: TaggingReceiptPaymentComponent;
  let fixture: ComponentFixture<TaggingReceiptPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingReceiptPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggingReceiptPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
