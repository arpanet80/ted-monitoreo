export class Usuario {
    constructor(
      public nombre: string,
      public materno: string,
      public documento: string,
      public fechaingreso: Date,
      public idunidad: number,
      public estado: boolean,
      public tipofuncionario: string,
      public paterno?: string,
      public password?: string,

      public prefijo?: string,
      public imagenperfil?: string,
      public usuario?: string,
      public idtikeador?: number,
      public telefonopersoal?: string,
      public firma?: boolean,
      public imagenfirma?: string,
      public emailpersonal?: string,
      public rol: string = 'User'
    ) {

    }
 }
