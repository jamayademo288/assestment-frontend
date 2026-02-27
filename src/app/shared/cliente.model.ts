export interface Cliente {
  id: number;
  nombre: string;
  genero?: string;
  edad?: number;
  identificacion: string;
  direccion?: string;
  telefono?: string;
  clienteId: string;
  password?: string;   // opcional en frontend
  estado: boolean;
}
