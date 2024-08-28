import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    spinerColor: string = "";
    spinerBgColor: string = "";
    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) {
        const style = 'min-width: 200px; background-color: darkblue; color: white; border: 5px solid hotpink; font-size: 2em; padding: 8px; border-radius: 122px; outline: 3px solid red; outline-offset: 7px; display: flex; justify-content: center; align-items: center; outline-style: groove; min-height: 200px; text-align: center; font-family: serif; vertical-align: middle;';
        console.log("%cNGIPF", style);
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
