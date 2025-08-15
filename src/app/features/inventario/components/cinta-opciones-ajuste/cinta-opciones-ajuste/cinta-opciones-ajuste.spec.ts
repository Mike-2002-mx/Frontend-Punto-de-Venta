import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CintaOpcionesAjuste } from './cinta-opciones-ajuste';

describe('CintaOpcionesAjuste', () => {
  let component: CintaOpcionesAjuste;
  let fixture: ComponentFixture<CintaOpcionesAjuste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CintaOpcionesAjuste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CintaOpcionesAjuste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
