import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CintaOpciones } from './cinta-opciones';

describe('CintaOpciones', () => {
  let component: CintaOpciones;
  let fixture: ComponentFixture<CintaOpciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CintaOpciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CintaOpciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
