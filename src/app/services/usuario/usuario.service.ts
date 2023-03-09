import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { UserLogin, UserToken } from 'src/app/models/index';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userToken!: UserToken;

  // confJson = {
  //   ApiUrl: ConfigJSon.apiServer.apiUrl,
  //   };

  constructor(
    private http: HttpClient,
    public router: Router,
    private jwtHelper :JwtHelperService
  ) {
  }

  GetTokenDecoded(): any {
    //console.log(this.jwtHelper.decodeToken(localStorage.getItem('token')!))
    return this.jwtHelper.decodeToken(localStorage.getItem('token')!);
    //return this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  }

  getTokenExpirationDate() {
    console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token')!))
    //this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.expToken);
  }

  isAuthenticated(): boolean {

    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token')!);
  }

  logout(){
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('token');
    localStorage.removeItem('resumen');
    this.router.navigate(['/login2']);
  }

  iniciaSesion(usuario: UserLogin){
    //let url = `${this.confJson.ApiUrl}User/Authenticate`;// `${environment.apiUrl}User/Authenticate`;
    let url = `${environment.apiUsuarios}LoginSistemas?idSistema=1`;
//console.log(url);
    return this.http.post(url, usuario)
                .pipe(map( (resp: any) => {
                    localStorage.setItem('token', JSON.stringify(resp));
                    this.userToken = this.GetTokenDecoded();
                    localStorage.setItem('idUsuario', String(this.userToken.idUsuario) );
                    //console.log(this.userToken.nombre);
                    return true;
                }));
  }

   crearUsuario(usuario: Usuario){
      //let url = `${this.confJson.ApiUrl}User/register`;
      let url = `${environment.apiUrl}User/register`;

      return this.http.post(url, usuario)
                .pipe(
                  map( (resp: any) => {
                    return true;
                  })
                );
   }
}
