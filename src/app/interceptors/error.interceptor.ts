import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    public router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // Error en e  lado del cliente o error de red
            this.toastr.error(`Client side Error`, 'ErrorEvent');
            console.log('Error Event');
          } else {
            // El backend retornó una respuesta incorrecta
            switch (error.status) {
              case 401:   //Unauthorized
                this.toastr.error(`Codigo: ${error.status} (No autorizado)`, 'Authorization Error');
                console.log(error.message);
                this._usuarioService.logout();
                break;
              case 403:   //Forbidden
                this.toastr.error(`Codigo: ${error.status} (Accesso Prohibido)`, 'Access Error');
                console.log(error.statusText);
                break;
              case 404:   //Not Found
                this.toastr.error(`Codigo: ${error.status} (No encontrado)`, 'Not Found');
                console.log(error.statusText);
                break;
              case 405:   //Method Not Allowed
                this.toastr.error(`Codigo: ${error.status} (Metodo no permitido)`, 'Method Not Allowed');
                //this.router.navigate(['/dashboard']);
                console.log(error.statusText);
                break;
              case 503:   //Service Unavailable
                this.toastr.error(`Codigo: ${error.status} (Servicio no disponible)`, 'Service Unavailable');
                console.log(error.statusText);
                break;
              default:
                this.toastr.error(`Codigo: ${error.status} Error de comunicacion con la API/HTTP`, 'Error');
                console.log('Error desconocido en HTTP');
                this.router.navigate(['/dashboard']);
                break;

            }
          }
        } else {
          console.log('Ocurrio un error');
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
