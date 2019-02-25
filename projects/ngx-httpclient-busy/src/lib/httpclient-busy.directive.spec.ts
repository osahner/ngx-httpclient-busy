import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientBusyModule } from './httpclient-busy.module';
import { HttpClientBusyDirective } from './httpclient-busy.directive';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'lib-test',
  template: `
    <div [httpClientBusy]="{ busy: 'busy', idle: 'idle' }"></div>
  `
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
      declarations: [TestComponent],
      imports: [HttpClientModule, HttpClientBusyModule.forRoot()],
      providers: []
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
  }));

  it('update directive class', async(() => {
    const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));

    http
      .put('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1s', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .subscribe(() => {
        expect(directiveEl.nativeElement.classList.contains('idle')).toBe(true, 'should contain idle class');
      });

    setTimeout(() => {
      expect(directiveEl.nativeElement.classList.contains('busy')).toBe(true, 'should contain busy class');
    }, 500);
  }));

  it('handle errors', async(() => {
    const directiveEl = fixture.debugElement.query(By.directive(HttpClientBusyDirective));

    http
      .put('http://www.mocky.io/v2/5a2fae752d00009614a83b2f?mocky-delay=1s', {
        headers: new HttpHeaders().set('Accept', 'application/json')
      })
      .pipe(catchError(selector => of({})))
      .subscribe(() => {
        expect(directiveEl.nativeElement.classList.contains('idle')).toBe(true, 'should contain idle class');
      });

    setTimeout(() => {
      expect(directiveEl.nativeElement.classList.contains('busy')).toBe(true, 'should contain busy class');
    }, 500);
  }));
});
