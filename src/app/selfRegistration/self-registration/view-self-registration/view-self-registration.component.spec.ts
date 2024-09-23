import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelfRegistrationComponent } from './view-self-registration.component';

describe('ViewSelfRegistrationComponent', () => {
  let component: ViewSelfRegistrationComponent;
  let fixture: ComponentFixture<ViewSelfRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelfRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSelfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
