import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePfInterestYearComponent } from './capture-pf-interest-year.component';

describe('CapturePfInterestYearComponent', () => {
  let component: CapturePfInterestYearComponent;
  let fixture: ComponentFixture<CapturePfInterestYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturePfInterestYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturePfInterestYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
