import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CounterService } from './counter.service';
import { HttpClientBusyInterceptor } from './http-client-busy.interceptor';
import { HttpClientBusyDirective } from './http-client-busy.directive';

export * from './counter.service';
export * from './http-client-busy.directive';
export * from './http-client-busy.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    HttpClientBusyDirective
  ],
  exports: [
    HttpClientBusyDirective
  ]
})
export class HttpClientBusyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpClientBusyModule,
      providers: [HttpClientBusyInterceptor, CounterService]
    }
  }
}
