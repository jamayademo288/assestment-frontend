import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovimientoService } from 'src/app/core/services/movimiento/movimiento.service';
import { Movimiento } from 'src/app/shared/movimiento.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.css']
})
export class MovimientosListComponent implements OnInit {

  movimientos: Movimiento[] = [];
  filteredMovimientos: Movimiento[] = [];

  searchControl = new FormControl('');

  loading = false;

  constructor(
    private movimientoService: MovimientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(): void {
    this.loading = true;

    this.movimientoService.getAll().subscribe({
      next: (res) => {
        this.movimientos = res;
        this.filteredMovimientos = res;
        this.loading = false;
      },
      error: () => {
        window.alert('Error al cargar movimientos');
        this.loading = false;
      }
    });
  }

  buscar(): void {

  const clienteId = Number(this.searchControl.value);

  if (!clienteId) return;

  this.loading = true;

  this.movimientoService.getByCuentaId(clienteId).subscribe({
    next: (res) => {
      this.filteredMovimientos = Array.isArray(res) ? res : [res];
      this.loading = false;
    },
    error: () => {
      this.filteredMovimientos = [];
      this.loading = false;
      window.alert('No se encontraron movimientos para ese cliente');
    }
  })
}

  limpiar(): void {
    this.searchControl.setValue('');
    this.loadMovimientos();
  }

  goToNew(): void {
    this.router.navigate(['/movimientos/nuevo']);
  }
}
