import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSubsComponent } from './change-subs.component';

describe('ChangeSubsComponent', () => {
  let component: ChangeSubsComponent;
  let fixture: ComponentFixture<ChangeSubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
