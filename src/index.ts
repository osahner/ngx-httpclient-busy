import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner.component';
import { SpinnerInterceptor } from './http.interceptor';
import { CountService } from "./count.service";

export * from './count.service';
export * from './http.interceptor';
export * from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    SpinnerInterceptor,
    CountService
  ]
})
export class LoadingSpinnerModule {
}
