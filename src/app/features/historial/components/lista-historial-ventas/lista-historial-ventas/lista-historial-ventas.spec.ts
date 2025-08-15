import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHistorialVentas } from './lista-historial-ventas';

describe('ListaHistorialVentas', () => {
  let component: ListaHistorialVentas;
  let fixture: ComponentFixture<ListaHistorialVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHistorialVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHistorialVentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
