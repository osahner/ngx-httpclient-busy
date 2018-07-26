import { Injectable } from '@angular/core';
import { Subscriber, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private readonly _observable: Observable<number>;
  private _subscriber: Subscriber<number>;
  private _connectionCounter = 0;

  constructor() {
    this._observable = Observable.create(subscriber => {
      this._subscriber = subscriber;
    }).pipe(share());
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
