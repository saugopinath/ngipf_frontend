import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceAcceptanceComponent } from './balance-acceptance.component';

describe('BalanceAcceptanceComponent', () => {
  let component: BalanceAcceptanceComponent;
  let fixture: ComponentFixture<BalanceAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
