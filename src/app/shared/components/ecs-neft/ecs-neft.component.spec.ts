/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EcsNeftComponent } from './ecs-neft.component';

describe('EcsNeftComponent', () => {
    let component: EcsNeftComponent;
    let fixture: ComponentFixture<EcsNeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcsNeftComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcsNeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
