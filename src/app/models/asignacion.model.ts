export class Asignacion {
  constructor(
    public id: number,
    public idresponsable: number,
    public fechaasignacion: string,
    public idTiket: number,
    public activo: boolean
  ) {  }
}
