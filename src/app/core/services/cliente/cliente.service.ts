import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener clientes', error);
          return of([]);
        })
      );
  }

  getById(id: number): Observable<Cliente | null> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener cliente', error);
          return of(null);
        })
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente)
      .pipe(
        catchError(error => {
          console.error('Error al crear cliente', error);
          return throwError(() => error);
        })
      );
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar cliente', error);
          return throwError(() => error);
        })
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar cliente', error);
          return throwError(() => error);
        })
      );
  }
}
