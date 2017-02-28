/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StackTraceService } from './stack-trace.service';

describe('StackTraceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackTraceService]
    });
  });

  it('should ...', inject([StackTraceService], (service: StackTraceService) => {
    expect(service).toBeTruthy();
  }));
});
