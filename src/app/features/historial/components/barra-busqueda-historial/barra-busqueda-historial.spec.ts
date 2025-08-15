import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBusquedaHistorial } from './barra-busqueda-historial';

describe('BarraBusquedaHistorial', () => {
  let component: BarraBusquedaHistorial;
  let fixture: ComponentFixture<BarraBusquedaHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
