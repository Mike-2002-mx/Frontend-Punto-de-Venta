import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosInventario } from './lista-productos-inventario';

describe('ListaProductosInventario', () => {
  let component: ListaProductosInventario;
  let fixture: ComponentFixture<ListaProductosInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProductosInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProductosInventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
