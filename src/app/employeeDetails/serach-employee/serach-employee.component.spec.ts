import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachEmployeeComponent } from './serach-employee.component';

describe('SerachEmployeeComponent', () => {
  let component: SerachEmployeeComponent;
  let fixture: ComponentFixture<SerachEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerachEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerachEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
