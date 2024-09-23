import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPFSubsciptionComponent } from './view-pfsubsciption.component';

describe('ViewPFSubsciptionComponent', () => {
  let component: ViewPFSubsciptionComponent;
  let fixture: ComponentFixture<ViewPFSubsciptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPFSubsciptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPFSubsciptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
