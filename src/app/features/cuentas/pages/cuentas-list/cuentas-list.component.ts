import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/core/services/cuenta/cuenta.service';
import { Cuenta } from 'src/app/shared/cuenta.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css'],
})
export class CuentasListComponent implements OnInit {
  cuentas: Cuenta[] = [];
  filteredCuentas: Cuenta[] = [];
  searchControl = new FormControl('');
  loading = false;

  constructor(
    private cuentaService: CuentaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCuentas();
  }

  loadCuentas(): void {
    this.loading = true;
    this.cuentaService.getAll().subscribe({
      next: (res) => {
        this.cuentas = res;
        this.filteredCuentas = res;
        this.loading = false;
      },
      error: () => {
        window.alert('Error al cargar cuentas');
        this.loading = false;
      },
    });
  }

  buscar(): void {
    const clienteId = Number(this.searchControl.value);

    if (!clienteId) return;
    this.loading = true;
    this.cuentaService.getByClienteId(clienteId).subscribe({
      next: (res) => {
        this.filteredCuentas = Array.isArray(res) ? res : [res];
        this.loading = false;
      },
      error: () => {
        this.filteredCuentas = [];
        this.loading = false;
        window.alert('No se encontraron cuentas para ese cliente');
      },
    });
  }

  limpiar(): void {
    this.searchControl.setValue('');
    this.loadCuentas();
  }

  goToNew(): void {
    this.router.navigate(['/cuentas/nuevo']);
  }
}
