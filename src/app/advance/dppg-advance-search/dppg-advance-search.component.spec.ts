import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DppgAdvanceSearchComponent } from './dppg-advance-search.component';

describe('DppgAdvanceSearchComponent', () => {
  let component: DppgAdvanceSearchComponent;
  let fixture: ComponentFixture<DppgAdvanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DppgAdvanceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DppgAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
