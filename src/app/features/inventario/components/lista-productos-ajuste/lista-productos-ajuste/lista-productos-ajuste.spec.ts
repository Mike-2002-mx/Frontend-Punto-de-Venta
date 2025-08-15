import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosAjuste } from './lista-productos-ajuste';

describe('ListaProductosAjuste', () => {
  let component: ListaProductosAjuste;
  let fixture: ComponentFixture<ListaProductosAjuste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProductosAjuste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProductosAjuste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
