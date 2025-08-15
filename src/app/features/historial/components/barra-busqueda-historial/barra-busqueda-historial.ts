import { Component, output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-barra-busqueda-historial',
  imports: [MatRadioModule],
  templateUrl: './barra-busqueda-historial.html',
  styleUrl: './barra-busqueda-historial.css'
})
export class BarraBusquedaHistorial {

  folio = output<string>();

  emitFolio(folio: string) {
    this.folio.emit(folio);
  }

}
