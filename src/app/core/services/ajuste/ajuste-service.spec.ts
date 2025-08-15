import { TestBed } from '@angular/core/testing';

import { AjusteService } from './ajuste-service';

describe('AjusteService', () => {
  let service: AjusteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjusteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
