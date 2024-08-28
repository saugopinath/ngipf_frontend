import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeMasterComponent } from './purpose-master.component';

describe('PurposeMasterComponent', () => {
  let component: PurposeMasterComponent;
  let fixture: ComponentFixture<PurposeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurposeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
