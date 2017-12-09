import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { LoadingSpinnerModule, SpinnerComponent, SpinnerInterceptor, CountService } from './index';
import { By } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  disabled;
  model;
}

describe('SpinnerModule::Component', () => {
  let httpMock: HttpTestingController;
  
  beforeEach(
    () => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        providers: [
          CountService,
          { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
        ],
        imports: [
          HttpClientTestingModule, HttpClientModule, LoadingSpinnerModule
        ]
      });
      //httpMock = TestBed.get(HttpTestingController);
    });
  
  afterEach(() => {
    //httpMock.verify();
  });
  
  it('init component', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<loading-spinner></loading-spinner>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();
    tick();
    
    const inputDebugEl = fixture.debugElement.query(By.css('i'));
    expect(inputDebugEl.classes).toBeDefined();
  }));
  
});

