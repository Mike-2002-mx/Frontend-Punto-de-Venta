import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBusquedaInventario } from './barra-busqueda-inventario';

describe('BarraBusquedaInventario', () => {
  let component: BarraBusquedaInventario;
  let fixture: ComponentFixture<BarraBusquedaInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaInventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
