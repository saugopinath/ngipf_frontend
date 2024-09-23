import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankChallanComponent } from './bank-challan.component';

describe('BankChallanComponent', () => {
  let component: BankChallanComponent;
  let fixture: ComponentFixture<BankChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankChallanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
