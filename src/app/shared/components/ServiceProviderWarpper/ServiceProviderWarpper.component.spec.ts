/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServiceProviderWarpperComponent } from './ServiceProviderWarpper.component';

describe('ServiceProviderWarpperComponent', () => {
    let component: ServiceProviderWarpperComponent;
    let fixture: ComponentFixture<ServiceProviderWarpperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServiceProviderWarpperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceProviderWarpperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
