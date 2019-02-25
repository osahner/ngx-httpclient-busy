import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterService } from './counter.service';

@Directive({
  selector: '[httpClientBusy]'
})
export class HttpClientBusyDirective implements OnInit, OnDestroy {
  private autoUnsubscribe: Subscription;
  private httpClientBusyConfig: HttpClientBusyConfig = {};

  @Input() httpClientBusy: HttpClientBusyConfig;

  constructor(private el: ElementRef, private renderer: Renderer2, private counter: CounterService) {}

  private _updateStatus(count: number) {
    const busy = count > 0;
    const hasIdle = this.el.nativeElement.classList.contains(this.httpClientBusyConfig.idle);
    const hasBusy = this.el.nativeElement.classList.contains(this.httpClientBusyConfig.busy);

    if (busy) {
      if (this.httpClientBusyConfig.idle && hasIdle) {
        this.renderer.removeClass(this.el.nativeElement, this.httpClientBusyConfig.idle);
      }
      if (this.httpClientBusyConfig.busy && !hasBusy) {
        this.renderer.addClass(this.el.nativeElement, this.httpClientBusyConfig.busy);
      }
    } else {
      if (this.httpClientBusyConfig.busy && hasBusy) {
        this.renderer.removeClass(this.el.nativeElement, this.httpClientBusyConfig.busy);
      }
      if (this.httpClientBusyConfig.idle && !hasIdle) {
        this.renderer.addClass(this.el.nativeElement, this.httpClientBusyConfig.idle);
      }
    }
  }

  ngOnInit() {
    this.httpClientBusyConfig.idle = this.httpClientBusy.idle || 'fade';
    this.httpClientBusyConfig.busy = this.httpClientBusy.busy || '';
    this._updateStatus(0);
    this.autoUnsubscribe = this.counter.observable.subscribe(next => this._updateStatus(next));
  }

  ngOnDestroy() {
    this.autoUnsubscribe.unsubscribe();
  }
}

export interface HttpClientBusyConfig {
  busy?: string;
  idle?: string;
}
