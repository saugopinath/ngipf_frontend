import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorListHavingVeBalanceBypassedComponent } from './operator-list-having-ve-balance-bypassed.component';

describe('OperatorListHavingVeBalanceBypassedComponent', () => {
  let component: OperatorListHavingVeBalanceBypassedComponent;
  let fixture: ComponentFixture<OperatorListHavingVeBalanceBypassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorListHavingVeBalanceBypassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorListHavingVeBalanceBypassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
