export interface AsistenciaModel {
  id: number,
  //nombre: string,
  titulo: string,
  descripcion: string,
  prioridad: string,
  estadoasistencia: string,
  fechasolicitud: string,
}

export class AsistenciaDetalle {
  constructor(
    public id?: number,
    public idestadoasistencia?: number,
    public idpersonal?: number,
    public idprioridad?: number,
    public idorigensolicitud?: number,
    public idtipoasistencia?: number,
    public idtipoequipo?: number,
    public titulo?: string,
    public descripcion?: string,
    public fechasolicitud?: string,
  ) {  }
}

export class AsistenciaDetalleAtendido {
  constructor(
    public idsolicitud: number,
    public idpersonal: number,
    public nombre: string,
    public prioridad: string,
    public fechasolicitud: string,
    public origen: string,
    public tipoasistencia: string,
    public tipoequipo: string,
    public titulo: string,
    public descripcion: string,
    public idestadoasistencia: number,
    public fechaatencion: string,
    public mensajeadicional: string,
    ) {  }
}

