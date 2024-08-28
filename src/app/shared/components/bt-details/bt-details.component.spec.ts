import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtDetailsComponent } from './bt-details.component';

describe('BtDetailsComponent', () => {
  let component: BtDetailsComponent;
  let fixture: ComponentFixture<BtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
