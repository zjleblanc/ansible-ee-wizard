import { TestBed } from '@angular/core/testing';

import { PypiService } from './pypi.service';

describe('PypiService', () => {
  let service: PypiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PypiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
