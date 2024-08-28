import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestRateComponent } from './add-interest-rate.component';

describe('AddInterestRateComponent', () => {
  let component: AddInterestRateComponent;
  let fixture: ComponentFixture<AddInterestRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterestRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
