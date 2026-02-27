import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/core/services/movimiento/movimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.css'],
})
export class MovimientoFormComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      cuentaId: ['', Validators.required],
      tipoMovimiento: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(1)]],
    });
  }

  save(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    const { cuentaId, tipoMovimiento, valor } = this.form.value;
    this.movimientoService
      .realizarMovimiento(cuentaId, tipoMovimiento, valor)
      .subscribe({
        next: () => {
          window.alert(
            `Movimiento ${tipoMovimiento} aplicado correctamente por ${valor}`,
          );
          this.loading = false;
          this.router.navigate(['/movimientos']);
        },
        error: () => {
          window.alert('No se pudo aplicar el movimiento');
          this.loading = false;
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/movimientos']);
  }
}
