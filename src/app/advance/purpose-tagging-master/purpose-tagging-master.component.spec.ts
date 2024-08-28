import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeTAggingMasterComponent } from './purpose-tagging-master.component';

describe('PurposeTAggingMasterComponent', () => {
  let component: PurposeTAggingMasterComponent;
  let fixture: ComponentFixture<PurposeTAggingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurposeTAggingMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposeTAggingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
