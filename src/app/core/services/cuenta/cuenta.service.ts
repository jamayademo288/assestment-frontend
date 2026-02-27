import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cuenta } from 'src/app/shared/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private readonly baseUrl = 'http://localhost:8080/api/cuentas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener cuentas', error);
          return of([]);
        })
      );
  }

  getById(id:number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener cuentas', error);
          return of([]);
        })
      );
  }

    getByClienteId(clienteId:number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.baseUrl}/cliente/${clienteId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener cuentas', error);
          return of([]);
        })
      );
  }

  create(clienteId: number, cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.baseUrl}/${clienteId}`, cuenta)
      .pipe(
        catchError(error => {
          console.error('Error al crear cuenta', error);
          return throwError(() => error);
        })
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar cuenta', error);
          return throwError(() => error);
        })
      );
  }
}
