import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, finalize, mergeMap, retryWhen } from 'rxjs/operators';
import { BackendError, ErrorSeverity } from '../models/error-message';

export const genericRetryStrategy =
  ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) =>
    (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
            retryAttempt > maxRetryAttempts ||
            excludedStatusCodes.find((e) => e === error.status)
          ) {
            return throwError(error);
          }
          console.log(
            `Intento ${retryAttempt}: reintentando en ${retryAttempt * scalingDuration
            }ms`
          );
          // retry after 1s, 2s, etc...
          return timer(retryAttempt * scalingDuration);
        }),
        finalize(() => console.log('We are done!'))
      );
    };

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(
        retryWhen(genericRetryStrategy({ excludedStatusCodes: [400] })),
        catchError((err) => {
          /**
           * Set proper backend error interface
           */

          console.log(err.error.message);
          let error!: BackendError;
          if (err instanceof ErrorEvent) {
            // this is client side error
            error = this.handleUnknownError();
            alert('Client error: ' + err.error.message);
          } else {
            // this is server side error
            error = this.handleBackendError(error, err);
            alert('Server error with code: ' + err.status);
          }
          return throwError(() => error);
        })
      );
  }

  private handleUnknownError(): BackendError {
    // this is not from backend. Format our own message.
    return {
      message: 'Unknown error!',
      severity: ErrorSeverity.FATAL,
      code: 'UNKNOWN_ERROR',
    };
  }

  private handleBackendError(error: BackendError, err: any): BackendError {
    // Backend returned error, format it here
    return {
      title: err.error?.title || 'Default title',
      message:
        err.error && err.error.message
          ? err.error.message
          : err.error
            ? err.error
            : err.message,
      severity: ErrorSeverity.ERROR,
      code: err.error?.identifierCode
        ? err.error.identifierCode
        : 'BACKEND_ERROR',
    };
  }
}
