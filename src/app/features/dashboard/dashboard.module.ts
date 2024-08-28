import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './dashboard.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import {CardModule} from 'primeng/card';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    ChartModule,
    StyleClassModule,
    NgxPermissionsModule.forChild(),CardModule
  ]
})
export class DashboardModule { }
