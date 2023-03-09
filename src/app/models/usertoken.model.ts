import { Role } from "./role.enum";

export class UserToken {
  constructor(
    public idUsuario: number,
    public sub: string,
    public nombres: string,
    public imagenperfil: string,
    public cargo: string,
    public seccion: string,
    public idRol: string
  ) {  }
}
