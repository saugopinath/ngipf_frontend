/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AmountDetailsComponent } from './amount-details.component';

describe('AmountDetailsComponent', () => {
    let component: AmountDetailsComponent;
    let fixture: ComponentFixture<AmountDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AmountDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AmountDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
