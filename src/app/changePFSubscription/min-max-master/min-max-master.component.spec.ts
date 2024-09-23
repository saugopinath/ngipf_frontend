import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxMasterComponent } from './min-max-master.component';

describe('MinMaxMasterComponent', () => {
  let component: MinMaxMasterComponent;
  let fixture: ComponentFixture<MinMaxMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMaxMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinMaxMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
