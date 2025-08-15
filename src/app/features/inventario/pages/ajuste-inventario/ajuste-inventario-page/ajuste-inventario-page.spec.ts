import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteInventarioPage } from './ajuste-inventario-page';

describe('AjusteInventarioPage', () => {
  let component: AjusteInventarioPage;
  let fixture: ComponentFixture<AjusteInventarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjusteInventarioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
