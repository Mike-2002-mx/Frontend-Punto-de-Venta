import { Component, output } from '@angular/core';

@Component({
  selector: 'app-motivo-ajuste-component',
  imports: [],
  templateUrl: './motivo-ajuste-component.html',
  styleUrl: './motivo-ajuste-component.css'
})
export class MotivoAjusteComponent {

  motivoAjuste = output<string>();

  

  onMotivoAjuste(motivo: string) {
    this.motivoAjuste.emit(motivo);
  }

}
