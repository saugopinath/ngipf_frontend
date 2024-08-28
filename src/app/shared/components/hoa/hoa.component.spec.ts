/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoaComponent } from './hoa.component';

describe('HoaComponent', () => {
    let component: HoaComponent;
    let fixture: ComponentFixture<HoaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HoaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HoaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
