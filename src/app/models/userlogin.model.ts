import { Role } from "./role.enum";

export class UserLogin {
  constructor(
    public nombreUsuario: string,
    public password: string
  ) {  }
}
