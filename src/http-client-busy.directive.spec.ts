import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CounterService, HttpClientBusyDirective, HttpClientBusyInterceptor, HttpClientBusyModule } from './index';


@Component({
  selector: 'test-cmp',
  template: `
    <div [httpClientBusy]="{ busy: 'busy', idle: 'idle' }"></div>`
})
class TestComponent {
  disabled;
  model;
}

describe('HttpClientBusyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          HttpClientTestingModule,
          HttpClientModule,
          HttpClientBusyModule
        ],
        providers: [
          CounterService,
          { provide: HTTP_INTERCEPTORS, useClass: HttpClientBusyInterceptor, multi: true }
        ]
      }).compileComponents().then(() => {
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });


  it('init directive', fakeAsync(() => {
    // fixture = TestBed.overrideTemplate(TestComponent,
    // `<div [httpClientBusy]="{ busy: 'busy', idle: 'idle' }"></div>`).createComponent(TestComponent);
    fixture.detectChanges();
    tick(100);

    const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));
    expect(directiveEl).not.toBeNull();
    // const directiveInstance = directiveEl.injector.get(HttpClientBusyDirective);
  }));

  // TODO Get the HttpClient Test running
  /*it('update directive', inject([HttpClient], (http: HttpClient) => {
    fixture.detectChanges();
    tick(100);

    const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));
    expect(directiveEl).not.toBeNull();

    http.put('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2s', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .subscribe(() => {
        console.error('longrunning done');
      });

    flushMicrotasks();
    tick(100);

    expect(directiveEl).not.toBeNull();
  }));*/
});

