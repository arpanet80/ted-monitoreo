import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //if (this._usuarioService.estaLogueado()) {
      if (this._usuarioService.isAuthenticated()) {
        //console.log("Paso por el login Guard");
        this._usuarioService.GetTokenDecoded();
        //this._usuarioService.getTokenExpirationDate();
        //console.log(this._usuarioService.isAuthenticated());
        return true;
      }
      else {
        console.log("Bloqueado por el Guard");
        //console.log(this._usuarioService.isAuthenticated());
        this.router.navigate(['/login']);
        return false;
      }
  }

}
