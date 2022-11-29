import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../shared/pipes/search-filter.pipe';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule  as Ng2Charts } from 'ng2-charts';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SearchFilterPipe,
    AddTaskDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Charts
  ]
})
export class DashboardModule { }
