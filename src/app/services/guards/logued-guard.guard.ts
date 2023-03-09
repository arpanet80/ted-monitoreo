import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoguedGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this._usuarioService.isAuthenticated()) {
        //console.log("Paso Guard Logued");
        this.router.navigate(['/dashboard']);
        return true;
      }
      else {
        console.log("Bloqueo Guard Logued");
        //this.router.navigate(['/login']);
        return true;
      }
  }

}
