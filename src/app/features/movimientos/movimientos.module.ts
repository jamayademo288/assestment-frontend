import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MovimientosListComponent } from './pages/movimientos-list/movimientos-list.component';
import { MovimientoFormComponent } from './pages/movimiento-form/movimiento-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovimientosListComponent,
    MovimientoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
