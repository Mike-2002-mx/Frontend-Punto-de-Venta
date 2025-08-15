import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjuste } from './modal-ajuste';

describe('ModalAjuste', () => {
  let component: ModalAjuste;
  let fixture: ComponentFixture<ModalAjuste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAjuste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjuste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
