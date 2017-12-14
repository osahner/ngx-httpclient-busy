# ngx-httpclient-busy

[![Build Status](https://travis-ci.org/osahner/ngx-httpclient-busy.svg?branch=master)](https://travis-ci.org/osahner/ngx-httpclient-busy)

## Installation

To install this library, run:

```bash
$ npm install ngx-httpclient-busy --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CounterService, HttpClientBusyInterceptor, HttpClientBusyModule } from 'ngx-httpclient-busy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientBusyModule.forRoot()
  ],
  providers: [
    CounterService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientBusyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Simple Working Gear [FontAwesome](http://fontawesome.io/) Icon

```xml
<i aria-hidden="true" class="fa fa-cog fa-fw fa-2x fa-spin text-muted loading-spinner fade" httpClientBusy></i>
```

## License

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
