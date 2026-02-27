import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { Cliente } from 'src/app/shared/cliente.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  searchControl = new FormControl('');

  loading = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.setupSearch();
  }

  loadClientes(): void {
    this.loading = true;

    this.clienteService.getAll().subscribe({
      next: (res) => {
        this.clientes = res;
        this.filteredClientes = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        window.alert('Error al cargar clientes');
      }
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges.subscribe(value => {
      const search = value?.toLowerCase() || '';
      this.filteredClientes = this.clientes.filter(c =>
        c.nombre.toLowerCase().includes(search) ||
        c.identificacion.toLowerCase().includes(search)
      );
    });
  }

  goToNew(): void {
    this.router.navigate(['/clientes/nuevo']);
  }

  editCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  deleteCliente(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {

      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe(() => {
          this.loadClientes();
          Swal.fire('Eliminado', 'Cliente eliminado correctamente', 'success');
        });
      }
    });
  }
}
