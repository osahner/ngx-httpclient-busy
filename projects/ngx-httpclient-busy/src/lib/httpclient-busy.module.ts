import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientBusyInterceptor } from './httpclient-busy.interceptor';
import { HttpClientBusyDirective } from './httpclient-busy.directive';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [HttpClientBusyDirective],
  exports: [HttpClientBusyDirective],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpClientBusyInterceptor, multi: true }],
})
export class HttpClientBusyModule {
  static forRoot(): ModuleWithProviders<HttpClientBusyModule> {
    return {
      ngModule: HttpClientBusyModule,
    };
  }
}
