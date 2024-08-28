import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestListOfOtherUserComponent } from './pending-request-list-of-other-user.component';

describe('PendingRequestListOfOtherUserComponent', () => {
  let component: PendingRequestListOfOtherUserComponent;
  let fixture: ComponentFixture<PendingRequestListOfOtherUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestListOfOtherUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRequestListOfOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
