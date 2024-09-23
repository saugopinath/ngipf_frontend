import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfRegisterYearComponent } from './pf-register-year.component';

describe('PfRegisterYearComponent', () => {
  let component: PfRegisterYearComponent;
  let fixture: ComponentFixture<PfRegisterYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfRegisterYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfRegisterYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
