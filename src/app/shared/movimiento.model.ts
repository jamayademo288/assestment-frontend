export type TipoMovimiento = 'CREDITO' | 'DEBITO';

export interface Movimiento {
  id: number;
  fecha: string;
  tipoMovimiento: TipoMovimiento;
  valor: number;
  saldo: number;
  cuenta: Cuenta;
}

export interface Cuenta {
  id: number
  numeroCuenta: string
  tipoCuenta: string
  saldoInicial: number
  saldoDisponible: number
  estado: boolean
  cliente: Cliente
}

export interface Cliente {
  nombre: string
  genero: string
  edad: number
  identificacion: string
  direccion: string
  telefono: string
  id: number
  clienteId: string
  password: string
  estado: boolean
}
