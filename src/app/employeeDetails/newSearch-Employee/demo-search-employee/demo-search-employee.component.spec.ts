import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSearchEmployeeComponent } from './demo-search-employee.component';

describe('DemoSearchEmployeeComponent', () => {
  let component: DemoSearchEmployeeComponent;
  let fixture: ComponentFixture<DemoSearchEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoSearchEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoSearchEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
