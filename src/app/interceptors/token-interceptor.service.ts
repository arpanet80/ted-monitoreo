import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = localStorage.getItem('token');        // Recupera el token del localstorage

    const tokenJwt = JSON.parse(jwt!);                // converite en json al token

    if (!tokenJwt) {                                  // Si el token no existe se devuelve la peticion sin modificarlo
      return next.handle(req);
    }

    const reqClon = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenJwt.token}`),    // inserta el Bearer Jwt en el clon de la peticion
    });

    return next.handle( reqClon ).pipe(
      //catchError(this.manejarError)             // Captura los errores

      // Aqui se debe verificr el error
      //catchError(this.manejarError)             // Captura los errores
    )
  }

  // manejarError(error: HttpErrorResponse){
  //   //console.log('Sucedio un error en la peticion');
  //   //this.toastr.error('Hubo un error en la peticion a la API', 'Error!!!');
  //   console.log('Registrando en el log file');
  //   console.warn('Danteeeeeee:e', error.status);
  //   return throwError('Error personalizado')
  // }
}
