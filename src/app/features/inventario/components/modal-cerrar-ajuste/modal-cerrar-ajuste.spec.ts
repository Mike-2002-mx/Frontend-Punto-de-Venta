import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCerrarAjuste } from './modal-cerrar-ajuste';

describe('ModalCerrarAjuste', () => {
  let component: ModalCerrarAjuste;
  let fixture: ComponentFixture<ModalCerrarAjuste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCerrarAjuste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCerrarAjuste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
