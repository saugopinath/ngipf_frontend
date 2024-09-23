import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedEmployeeBalanceComponent } from './captured-employee-balance.component';

describe('CapturedEmployeeBalanceComponent', () => {
  let component: CapturedEmployeeBalanceComponent;
  let fixture: ComponentFixture<CapturedEmployeeBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturedEmployeeBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturedEmployeeBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
