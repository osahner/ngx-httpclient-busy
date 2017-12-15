import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CounterService, HttpClientBusyInterceptor, HttpClientBusyModule } from './index';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClientBusyDirective } from './http-client-busy.directive';

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
  let http: HttpClient;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        HttpClientModule,
        HttpClientBusyModule
      ],
      providers: [
        CounterService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpClientBusyInterceptor, multi: true }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([HttpClient], (s: HttpClient) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    http = s;
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  }));

  it('init directive', fakeAsync(() => {
      const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));
      expect(directiveEl).not.toBeNull();
    })
  );

  it('update directive class',
    async(() => {
      const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));

      http.put('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1s', {
          headers: new HttpHeaders().set('Accept', 'application/json')
        })
        .subscribe(() => {
          expect(directiveEl.nativeElement.classList.contains('idle'))
            .toBe(true, 'should contain idle class');
        });

      setTimeout(function () {
        expect(directiveEl.nativeElement.classList.contains('busy'))
          .toBe(true, 'should contain busy class');
      }, 500)

    })
  );

  it('handle errors',
    async(() => {
      const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));

      http.put('http://www.mocky.io/v2/5a2fae752d00009614a83b2f?mocky-delay=1s', {
          headers: new HttpHeaders().set('Accept', 'application/json')
        })
        .catch(() => {
          return Observable.of({});
        })
        .subscribe(() => {
          expect(directiveEl.nativeElement.classList.contains('idle'))
            .toBe(true, 'should contain idle class');
        });

      setTimeout(function () {
        expect(directiveEl.nativeElement.classList.contains('busy'))
          .toBe(true, 'should contain busy class');
      }, 500)

    })
  );
});

