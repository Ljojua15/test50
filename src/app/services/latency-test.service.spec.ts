import { TestBed } from '@angular/core/testing';

import { LatencyTestService } from './latency-test.service';

describe('LatencyTestService', () => {
  let service: LatencyTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatencyTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
