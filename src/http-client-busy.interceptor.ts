import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { CounterService } from './counter.service';

@Injectable()
export class HttpClientBusyInterceptor implements HttpInterceptor {

  constructor(private _counter: CounterService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    this._counter.increment();
    return next.handle(req)
      .do(evt => {
        if (evt instanceof HttpResponse) {
          this._counter.decrement();
        }
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          this._counter.decrement();
        }
        return Observable.throw(err);
      });
  }
}

