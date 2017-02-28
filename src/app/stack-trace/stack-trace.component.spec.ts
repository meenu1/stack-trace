/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StackTraceComponent } from './stack-trace.component';

describe('StackTraceComponent', () => {
  let component: StackTraceComponent;
  let fixture: ComponentFixture<StackTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
