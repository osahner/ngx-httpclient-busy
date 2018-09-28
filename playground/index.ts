/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClientBusyModule } from '../dist';

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
  constructor(private http: HttpClient) {}

  public ping() {
    this.http
      .put<Array<any>>('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1s', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .pipe(
        catchError(() => {
          return throwError('An error occurred');
        })
      )
      .subscribe(() => {
        console.log('long running request done');
      });
    this.http
      .put<Array<any>>('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=100ms', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .pipe(
        catchError(() => {
          return throwError('An error occurred');
        })
      )
      .subscribe(() => {
        console.log('short running request done');
      });

    this.http
      .put<Array<any>>('http://www.mocky.io/v2/5a2fae752d00009614a83b2f', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .pipe(
        catchError(() => {
          console.log('error request done');
          return throwError('An error occurred');
        })
      )
      .subscribe(() => {
        console.log('never happens');
      });
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-console
    console.info('AppComponent init');
  }
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, HttpClientBusyModule.forRoot()]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
