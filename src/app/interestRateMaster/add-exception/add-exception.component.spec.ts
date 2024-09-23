import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExceptionComponent } from './add-exception.component';

describe('AddExceptionComponent', () => {
  let component: AddExceptionComponent;
  let fixture: ComponentFixture<AddExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
