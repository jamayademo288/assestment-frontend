import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from 'src/app/core/services/reporte/reporte.service';
import { Movimiento } from 'src/app/shared/movimiento.model';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
  form: FormGroup;
  movimientos: Movimiento[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService,
  ) {
    this.form = this.fb.group({
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
    });
  }

  generarReporte(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    const { desde, hasta } = this.form.value;
    this.reporteService.generarReporte(desde, hasta).subscribe({
      next: (res) => {
        this.movimientos = res;
        this.loading = false;

        if (res.length === 0) {
          window.alert('No hay movimientos en ese rango de fechas');
        }
      },
      error: () => {
        window.alert('Error al generar reporte');
        this.loading = false;
      },
    });
  }

  exportar(): void {
    if (this.form.invalid) {
      window.alert('Debe seleccionar un rango de fechas');
      return;
    }

    const { desde, hasta } = this.form.value;
    this.loading = true;
    this.reporteService.generarPdf(desde, hasta).subscribe({
      next: (base64String: string) => {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte_${desde}_${hasta}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);

        this.loading = false;
      },
      error: () => {
        window.alert('No se pudo descargar el reporte');
        this.loading = false;
      },
    });
  }
}
