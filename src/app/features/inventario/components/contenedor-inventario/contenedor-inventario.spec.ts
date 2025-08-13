import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorInventario } from './contenedor-inventario';

describe('ContenedorInventario', () => {
  let component: ContenedorInventario;
  let fixture: ComponentFixture<ContenedorInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorInventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
