import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatePfInterestCalculationComponent } from './initiate-pf-interest-calculation.component';

describe('InitiatePfInterestCalculationComponent', () => {
  let component: InitiatePfInterestCalculationComponent;
  let fixture: ComponentFixture<InitiatePfInterestCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiatePfInterestCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiatePfInterestCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
