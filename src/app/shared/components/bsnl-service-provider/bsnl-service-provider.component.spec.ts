/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BsnlServiceProviderComponent } from './bsnl-service-provider.component';

describe('BsnlServiceProviderComponent', () => {
    let component: BsnlServiceProviderComponent;
    let fixture: ComponentFixture<BsnlServiceProviderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BsnlServiceProviderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BsnlServiceProviderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
