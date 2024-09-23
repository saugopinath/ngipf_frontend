import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepositeTresuryBankComponent } from './view-deposite-tresury-bank.component';

describe('ViewDepositeTresuryBankComponent', () => {
  let component: ViewDepositeTresuryBankComponent;
  let fixture: ComponentFixture<ViewDepositeTresuryBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepositeTresuryBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepositeTresuryBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
