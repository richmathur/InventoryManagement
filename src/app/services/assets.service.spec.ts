import { TestBed } from '@angular/core/testing';

import { AssetsServiceTs } from './assets.service.ts';

describe('AssetsServiceTs', () => {
  let service: AssetsServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
