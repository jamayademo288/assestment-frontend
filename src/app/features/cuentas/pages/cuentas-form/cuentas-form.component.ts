import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from 'src/app/core/services/cuenta/cuenta.service';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/cuenta.model';
import { Cuenta } from 'src/app/shared/cuenta.model';

@Component({
  selector: 'app-cuentas-form',
  templateUrl: './cuentas-form.component.html',
  styleUrls: ['./cuentas-form.component.css']
})
export class CuentasFormComponent {

  form: FormGroup;
  loading = false;

  clienteBuscado: Cliente | null = null;
  buscandoCliente = false;
  clienteIdBusqueda: number | null = null;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      numeroCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      estado: [true]
    });
  }

 buscarCliente(id: string): void {
  const clienteId = Number(id);
  if (!clienteId || isNaN(clienteId)) {
    window.alert('Ingrese un ID válido');
    return;
  }

  this.buscandoCliente = true;
  this.clienteBuscado = null;
  this.clienteService.getById(clienteId).subscribe({
    next: (cliente) => {
      this.clienteBuscado = cliente;
      this.buscandoCliente = false;
    },
    error: () => {
      window.alert('Cliente no encontrado');
      this.buscandoCliente = false;
    }
  });
}

  save(): void {
    if (this.form.invalid || this.loading || !this.clienteBuscado) {
      window.alert('Debe seleccionar un cliente válido');
      return;
    }

    this.loading = true;
    const formValue = this.form.value;
    const id = Number(this.clienteBuscado.id);
    const cuenta: Cuenta = {
      numeroCuenta: formValue.numeroCuenta,
      tipoCuenta: formValue.tipoCuenta,
      saldoInicial: formValue.saldoInicial,
      saldoDisponible: formValue.saldoInicial,
      estado: formValue.estado,
      cliente: this.clienteBuscado
    };

    this.cuentaService.create(id, cuenta).subscribe({
      next: () => {
        window.alert('Cuenta creada correctamente');
        this.router.navigate(['/cuentas']);
      },
      error: () => {
        window.alert('No se pudo crear la cuenta');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cuentas']);
  }
}
