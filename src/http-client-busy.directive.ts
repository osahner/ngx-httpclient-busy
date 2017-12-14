import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CounterService } from './counter.service';

@Directive({
  selector: '[httpClientBusy]'
})
export class HttpClientBusyDirective implements OnInit, OnDestroy {

  private _autoUnsubscribe: Subscription;
  private _httpClientBusyConfig: HttpClientBusyConfig = {};

  @Input() httpClientBusy: HttpClientBusyConfig;

  constructor(private _el: ElementRef,
              private _renderer: Renderer2,
              private _counter: CounterService) {
  }

  private _updateStatus(count: number) {
    const busy = (count > 0);
    const hasIdle = this._el.nativeElement.classList.contains(this._httpClientBusyConfig.idle);
    const hasBusy = this._el.nativeElement.classList.contains(this._httpClientBusyConfig.busy);

    if (busy) {
      if (this._httpClientBusyConfig.idle && hasIdle) {
        this._renderer.removeClass(this._el.nativeElement, this._httpClientBusyConfig.idle);
      }
      if (this._httpClientBusyConfig.busy && !hasBusy) {
        this._renderer.addClass(this._el.nativeElement, this._httpClientBusyConfig.busy);
      }
    } else {
      if (this._httpClientBusyConfig.busy && hasBusy) {
        this._renderer.removeClass(this._el.nativeElement, this._httpClientBusyConfig.busy);
      }
      if (this._httpClientBusyConfig.idle && !hasIdle) {
        this._renderer.addClass(this._el.nativeElement, this._httpClientBusyConfig.idle);
      }
    }
  }

  ngOnInit() {
    // this._renderer.addClass(this._el.nativeElement, 'http-client-busy');
    this._httpClientBusyConfig.idle = this.httpClientBusy.idle || 'fade';
    this._httpClientBusyConfig.busy = this.httpClientBusy.busy || '';
    this._updateStatus(0);
    this._autoUnsubscribe = this._counter.observable.subscribe(next => this._updateStatus(next));
  }

  ngOnDestroy() {
    this._autoUnsubscribe.unsubscribe();
  }
}

export interface HttpClientBusyConfig {
  busy?: string;
  idle?: string;
}

