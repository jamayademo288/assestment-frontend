import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasListComponent } from './pages/cuentas-list/cuentas-list.component';
import { CuentasFormComponent } from './pages/cuentas-form/cuentas-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CuentasListComponent,
    CuentasFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CuentasRoutingModule
  ]
})
export class CuentasModule { }
