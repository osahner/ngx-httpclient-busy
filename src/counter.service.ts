import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class CounterService {
  private _observable: Observable<number>;
  private _subscriber: Subscriber<number>;
  private _connectionCounter = 0;

  constructor() {
    this._observable = Observable.create(subscriber => {
      this._subscriber = subscriber;
    }).share();
  }

  public get observable(): Observable<number> {
    return this._observable;
  }

  public increment() {
    this._connectionCounter += 1;
    this._next();
  }

  public decrement() {
    this._connectionCounter -= 1;
    this._next();
  }

  private _next() {
    if (this._subscriber) {
      this._subscriber.next(this._connectionCounter);
    }
  }
}
