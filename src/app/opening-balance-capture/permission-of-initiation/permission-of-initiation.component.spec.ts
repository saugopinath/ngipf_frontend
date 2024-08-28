import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionOfInitiationComponent } from './permission-of-initiation.component';

describe('PermissionOfInitiationComponent', () => {
  let component: PermissionOfInitiationComponent;
  let fixture: ComponentFixture<PermissionOfInitiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionOfInitiationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionOfInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
