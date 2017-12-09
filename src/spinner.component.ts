import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CountService } from "./count.service";

@Component({
  selector: 'loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<i class="fa fa-cog fa-fw fa-2x fa-spin text-muted loading-spinner" [ngClass]="{ 'fade': !visible }"
    aria-hidden="true"></i>`
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public visible: boolean;
  private autoUnsubscribe: any;
  
  constructor(protected cd: ChangeDetectorRef,
              public counter: CountService) {
  }
  
  ngOnInit() {
    this.autoUnsubscribe = this.counter.observable.subscribe(next => {
      this.visible = (next > 0);
      this.cd.markForCheck();
    });
  }
  
  ngOnDestroy() {
    this.autoUnsubscribe.unsubscribe();
  }
}
