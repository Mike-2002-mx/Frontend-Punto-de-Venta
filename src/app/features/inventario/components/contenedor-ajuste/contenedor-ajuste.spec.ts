import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAjuste } from './contenedor-ajuste';

describe('ContenedorAjuste', () => {
  let component: ContenedorAjuste;
  let fixture: ComponentFixture<ContenedorAjuste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAjuste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAjuste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
