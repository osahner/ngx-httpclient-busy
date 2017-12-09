import { Injectable } from '@angular/core';
import { Subscriber } from "rxjs/Subscriber";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CountService {
  private _observable: Observable<number>;
  private _subscriber: Subscriber<number>;
  private _connectionCounter = 0;
  
  constructor() {
    console.log('CountService init');
    this._observable = Observable.create(subscriber => {
      this._subscriber = subscriber;
    }).share();
  }
  
  public get observable(): Observable<number> {
    return this._observable;
  }
  
  public increment() {
    this._connectionCounter += 1;
    this._subscriber.next(this._connectionCounter);
  }
  
  public decrement() {
    this._connectionCounter -= 1;
    this._subscriber.next(this._connectionCounter);
  }
}
