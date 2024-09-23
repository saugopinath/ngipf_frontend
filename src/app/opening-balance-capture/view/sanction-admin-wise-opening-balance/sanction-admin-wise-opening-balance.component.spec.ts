import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionAdminWiseOpeningBalanceComponent } from './sanction-admin-wise-opening-balance.component';

describe('SanctionAdminWiseOpeningBalanceComponent', () => {
  let component: SanctionAdminWiseOpeningBalanceComponent;
  let fixture: ComponentFixture<SanctionAdminWiseOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionAdminWiseOpeningBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanctionAdminWiseOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
