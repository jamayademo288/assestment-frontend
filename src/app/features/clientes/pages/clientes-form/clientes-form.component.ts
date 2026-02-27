import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { Cliente } from 'src/app/shared/cliente.model';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  clienteIdParam!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      genero: [''],
      edad: [null, [Validators.required, Validators.min(1)]],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      clienteId: ['', Validators.required],
      password: ['', Validators.required],
      estado: [true],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.clienteIdParam = +params['id'];
        this.loadCliente(this.clienteIdParam);
      }
    });
  }

  loadCliente(id: number): void {
    this.loading = true;

    this.clienteService.getById(id).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.form.patchValue(cliente);
        }
        this.loading = false;
      },
      error: () => {
        window.alert('Error al cargar el cliente');
        this.loading = false;
      },
    });
  }

  save(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    const formValue = this.form.value;
    if (this.isEditMode) {
      const clienteEditado: Cliente = formValue;
      this.clienteService
        .update(this.clienteIdParam, clienteEditado)
        .subscribe({
          next: () => {
            window.alert('Cliente actualizado correctamente');
            this.loading = false;
            this.router.navigate(['/clientes']);
          },
          error: () => {
            window.alert('No se pudo actualizar el cliente');
            this.loading = false;
          },
        });
    } else {
      const { id, ...clienteNuevo } = formValue;
      this.clienteService.create(clienteNuevo).subscribe({
        next: () => {
          window.alert('Cliente creado correctamente');
          this.loading = false;
          this.router.navigate(['/clientes']);
        },
        error: () => {
          window.alert('No se pudo crear el cliente');
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
