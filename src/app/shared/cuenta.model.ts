export type TipoCuenta = 'AHORRO' | 'CORRIENTE';

export interface Cuenta {
  id?: number;
  numeroCuenta: string;
  tipoCuenta: TipoCuenta;
  saldoInicial: number;
  saldoDisponible?: number;
  estado: boolean;
  clienteId?: number;
  cliente: Cliente;
}

export interface Cliente {
  nombre?: string
  genero?: string
  edad?: number
  identificacion?: string
  direccion?: string
  telefono?: string
  id?: number
  clienteId?: string
  password?: string
  estado?: boolean
}
