import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningBalanceStatusForSanctioningAuthorityComponent } from './opening-balance-status-for-sanctioning-authority.component';

describe('OpeningBalanceStatusForSanctioningAuthorityComponent', () => {
  let component: OpeningBalanceStatusForSanctioningAuthorityComponent;
  let fixture: ComponentFixture<OpeningBalanceStatusForSanctioningAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningBalanceStatusForSanctioningAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningBalanceStatusForSanctioningAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
