import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatedRoleComponent } from './delegated-role.component';

describe('DelegatedRoleComponent', () => {
  let component: DelegatedRoleComponent;
  let fixture: ComponentFixture<DelegatedRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatedRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegatedRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
