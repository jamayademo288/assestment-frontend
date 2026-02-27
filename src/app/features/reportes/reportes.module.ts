import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
