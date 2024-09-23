import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceStatusComponent } from './balance-status.component';

describe('BalanceStatusComponent', () => {
  let component: BalanceStatusComponent;
  let fixture: ComponentFixture<BalanceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
