import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreditGenerationMasterComponent } from './interest-credit-generation-master.component';

describe('InterestCreditGenerationMasterComponent', () => {
  let component: InterestCreditGenerationMasterComponent;
  let fixture: ComponentFixture<InterestCreditGenerationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestCreditGenerationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestCreditGenerationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
