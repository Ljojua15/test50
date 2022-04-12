import { TestBed } from '@angular/core/testing';

import { TranslateResolver } from './translate.resolver';

describe('TranslateResolver', () => {
  let resolver: TranslateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TranslateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
