import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoAjusteComponent } from './motivo-ajuste-component';

describe('MotivoAjusteComponent', () => {
  let component: MotivoAjusteComponent;
  let fixture: ComponentFixture<MotivoAjusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoAjusteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
