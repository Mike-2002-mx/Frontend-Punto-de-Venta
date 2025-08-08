import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCerrarVenta } from './modal-cerrar-venta';

describe('ModalCerrarVenta', () => {
  let component: ModalCerrarVenta;
  let fixture: ComponentFixture<ModalCerrarVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCerrarVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCerrarVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
