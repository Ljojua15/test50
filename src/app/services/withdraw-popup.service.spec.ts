import { TestBed } from '@angular/core/testing';

import { WithdrawPopupService } from './withdraw-popup.service';

describe('WithdrawPopupService', () => {
  let service: WithdrawPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
