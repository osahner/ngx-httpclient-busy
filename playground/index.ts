/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/catch";

import { CounterService, HttpClientBusyInterceptor, HttpClientBusyModule } from '../dist';

@Component({
  selector: 'app',
  template: `Icon
  <i aria-hidden="true" class="fa fa-cog fa-fw fa-2x fa-spin text-muted loading-spinner fade" httpClientBusy></i>
  <br>
  <div class="alert alert-info transition" role="alert" httpClientBusy>
    httpClientBusy
  </div>
  <div class="alert alert-success transition" role="alert"
    [httpClientBusy]="{idle: 'alert-success', busy: 'alert-info'}">
    httpClientBusy Config <code>idle: 'alert-success', busy: 'alert-info'</code>
  </div>
  <hr>
  <button class="btn btn-outline-primary" (click)="ping()">Ping</button>
  `
})
class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  public ping() {
    this.http
      .put<Array<any>>('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1s', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .catch((error: any) => {
        return Observable.throw('An error occurred');
      })
      .subscribe(() => {
        console.log('longrunning request done');
      });
    this.http
      .put<Array<any>>('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=100ms', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .catch((error: any) => {
        return Observable.throw('An error occurred');
      })
      .subscribe(() => {
        console.log('shortrunning request done');
      });

    this.http
      .put<Array<any>>('http://www.mocky.io/v2/5a2fae752d00009614a83b2f', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .catch((error: any) => {
        console.log('error request done');
        return Observable.throw('An error occurred');
      })
      .subscribe(() => {
        console.log('never happens');
      });
  }

  ngOnInit(): void {
    console.info('AppComponent init');
  }

}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, HttpClientModule, HttpClientBusyModule.forRoot()],
  providers: [
    CounterService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientBusyInterceptor, multi: true }
  ]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);