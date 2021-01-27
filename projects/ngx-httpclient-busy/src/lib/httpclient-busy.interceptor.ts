import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientBusyInterceptor implements HttpInterceptor {
  constructor(private counter: CounterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.counter.increment();
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.counter.decrement();
        }
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.counter.decrement();
        }
        return throwError(err);
      })
    );
  }
}
