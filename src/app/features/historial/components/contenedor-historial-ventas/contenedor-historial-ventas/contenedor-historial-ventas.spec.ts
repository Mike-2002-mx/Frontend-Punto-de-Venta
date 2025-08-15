import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorHistorialVentas } from './contenedor-historial-ventas';

describe('ContenedorHistorialVentas', () => {
  let component: ContenedorHistorialVentas;
  let fixture: ComponentFixture<ContenedorHistorialVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorHistorialVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorHistorialVentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
