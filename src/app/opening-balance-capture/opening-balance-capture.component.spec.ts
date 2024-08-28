import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningBalanceCaptureComponent } from './opening-balance-capture.component';

describe('OpeningBalanceCaptureComponent', () => {
  let component: OpeningBalanceCaptureComponent;
  let fixture: ComponentFixture<OpeningBalanceCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningBalanceCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningBalanceCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
