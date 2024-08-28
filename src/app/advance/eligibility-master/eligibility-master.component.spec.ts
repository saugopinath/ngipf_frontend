import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityMasterComponent } from './eligibility-master.component';

describe('EligibilityMasterComponent', () => {
  let component: EligibilityMasterComponent;
  let fixture: ComponentFixture<EligibilityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibilityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EligibilityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
