import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from "rxjs/Subscriber";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import { CountService } from "./count.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private counter: CountService) {
    console.log('SpinnerInterceptor init');
  }
  
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    this.counter.increment();
    
    /*const postReq = req.clone({
      headers: req.headers.set('Authorization', '123')
    });*/
    
    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        this.counter.decrement();
      }
    });
    
  }
}

