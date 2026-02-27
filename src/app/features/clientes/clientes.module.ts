import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientesListComponent,
    ClientesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
