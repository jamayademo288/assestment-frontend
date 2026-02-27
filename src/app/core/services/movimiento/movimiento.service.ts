import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movimiento, TipoMovimiento } from 'src/app/shared/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private readonly baseUrl = 'http://localhost:8080/api/movimientos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener movimientos', error);
          return of([]);
        })
      );
  }

  getById(clienteId:number): Observable<Movimiento[]> {
      return this.http.get<Movimiento[]>(`${this.baseUrl}/${clienteId}`)
        .pipe(
          catchError(error => {
            console.error('Error al obtener Movimiento', error);
            return of([]);
          })
        );
    }

  getByCuentaId(clienteId:number): Observable<Movimiento[]> {
      return this.http.get<Movimiento[]>(`${this.baseUrl}/cliente/${clienteId}`)
        .pipe(
          catchError(error => {
            console.error('Error al obtener Movimiento', error);
            return of([]);
          })
        );
    }

  realizarMovimiento(
    cuentaId: number,
    tipo: TipoMovimiento,
    valor: number
  ): Observable<Movimiento> {

    return this.http.post<Movimiento>(
      `${this.baseUrl}/${cuentaId}?tipo=${tipo}&valor=${valor}`,
      {}
    ).pipe(
      catchError(error => {
        console.error('Error al realizar movimiento', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar movimiento', error);
          return throwError(() => error);
        })
      );
  }
}
