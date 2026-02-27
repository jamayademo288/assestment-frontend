import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movimiento } from 'src/app/shared/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private readonly baseUrl = 'http://localhost:8080/api/reportes';

  constructor(private http: HttpClient) {}

  generarReporte(desde: string, hasta: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(
      `${this.baseUrl}?desde=${desde}&hasta=${hasta}`
    ).pipe(
      catchError(error => {
        console.error('Error al generar reporte', error);
        return of([]);
      })
    );
  }

  generarPdf(desde: string, hasta: string): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/pdf?desde=${desde}&hasta=${hasta}`,
      { responseType: 'text' }
    ).pipe(
      catchError(error => {
        console.error('Error al generar PDF', error);
        return throwError(() => error);
      })
    );
  }
}
