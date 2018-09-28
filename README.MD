# ngx-httpclient-busy

A global Angular ^5 HTTP Interceptor with decorator to show staus of all HttpClient requests (e.g. busy/working indicator)

Demo on [stackblitz](https://stackblitz.com/edit/angular-9ykyid?embed=1&file=src/app/app.component.html)

[![Build Status](https://travis-ci.org/osahner/ngx-httpclient-busy.svg?branch=master)](https://travis-ci.org/osahner/ngx-httpclient-busy)

## Installation

To install this library, run:

```console
npm install ngx-httpclient-busy --save
```
or
```console
yarn add ngx-httpclient-busy
```

### Example

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientBusyModule } from 'ngx-httpclient-busy';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientBusyModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient) {}

  public ping() {
    this.http
      .put<Array<any>>('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1s', {})
      .pipe(
        catchError(() => {
          return throwError('An error occurred');
        })
      )
      .subscribe(() => {
        console.log('long running request done');
      });
  }
}
```

```html
<!-- app.component.html -->
<div>
  <link href="https://maxcdn.bootstrapcdn.com/bootswatch/4.1.0/united/bootstrap.min.css"
  rel="stylesheet"
  crossorigin="anonymous">

  <div class="alert alert-success" role="alert"
    [httpClientBusy]="{idle: 'alert-success', busy: 'alert-info'}">
    httpClientBusy custom config
  </div>

  <div class="alert alert-info" role="alert" httpClientBusy>
    httpClientBusy default
  </div>

  <button class="btn btn-outline-primary" (click)="ping()">Ping</button>
</div>
```
or a simple working gear with [FontAwesome](http://fontawesome.io/) Icons

```html
<i aria-hidden="true" class="fa fa-cog fa-fw fa-2x fa-spin text-muted loading-spinner fade" httpClientBusy></i>
```

### Configuration

```typescript
export interface HttpClientBusyConfig {
  busy?: string; // default value ''
  idle?: string; // default value 'fade'
}
```

### Changelog

* v0.2.1 angular 6 and rxs 6


## License

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
