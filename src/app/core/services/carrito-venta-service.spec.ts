import { TestBed } from '@angular/core/testing';

import { CarritoVentaService } from './carrito-venta-service';

describe('CarritoVentaService', () => {
  let service: CarritoVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
