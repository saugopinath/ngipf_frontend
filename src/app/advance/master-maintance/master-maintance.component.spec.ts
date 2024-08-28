import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintanceComponent } from './master-maintance.component';

describe('MasterMaintanceComponent', () => {
  let component: MasterMaintanceComponent;
  let fixture: ComponentFixture<MasterMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMaintanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
