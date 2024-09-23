import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialCaptureBalanceComponent } from './initial-capture-balance.component';

describe('InitialCaptureBalanceComponent', () => {
  let component: InitialCaptureBalanceComponent;
  let fixture: ComponentFixture<InitialCaptureBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialCaptureBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialCaptureBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
