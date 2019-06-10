# ngx-httpclient-busy

> A global Angular HttpClient Interceptor with decorator to show staus of all HttpClient requests (e.g. busy/working indicator)

[![Build Status](https://travis-ci.org/osahner/ngx-httpclient-busy.svg?branch=master)](https://travis-ci.org/osahner/ngx-httpclient-busy)
[![npm version](https://badge.fury.io/js/ngx-httpclient-busy.svg)](https://badge.fury.io/js/ngx-httpclient-busy)
[![codecov](https://codecov.io/gh/osahner/ngx-httpclient-busy/branch/develop/graph/badge.svg)](https://codecov.io/gh/osahner/ngx-httpclient-busy)

## Installation

```sh
npm install ngx-httpclient-busy --save
```

## Integration

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
  <link href="https://maxcdn.bootstrapcdn.com/bootswatch/4.3.1/united/bootstrap.min.css"
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

## Documentation

> Demo on [stackblitz](https://stackblitz.com/edit/angular-9ykyid?embed=1&file=src/app/app.component.html)

```typescript
export interface HttpClientBusyConfig {
  busy?: string; // default value ''
  idle?: string; // default value 'fade'
}
```

## Release History

- 0.4.0
  - update @angular/cli and @angular/core to v8
- 0.3.0
  - switched to @angular/cli and ng-packagr,
  - requires @angular/core v7
- 0.2.1
  - requires @angular/core v7 and rxjs v6


## LICENSE

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
