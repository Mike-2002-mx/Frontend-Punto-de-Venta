import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CintaOpcionesInventario } from './cinta-opciones-inventario';

describe('CintaOpcionesInventario', () => {
  let component: CintaOpcionesInventario;
  let fixture: ComponentFixture<CintaOpcionesInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CintaOpcionesInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CintaOpcionesInventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
