import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowUserManagementComponent } from './workflow-user-management.component';

describe('WorkflowUserManagementComponent', () => {
  let component: WorkflowUserManagementComponent;
  let fixture: ComponentFixture<WorkflowUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowUserManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
