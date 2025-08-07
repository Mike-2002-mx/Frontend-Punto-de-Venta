import { Component, output } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda',
  imports: [],
  templateUrl: './barra-busqueda.html',
  styleUrl: './barra-busqueda.css'
})
export class BarraBusqueda {
  codigoBarras = output<string>()

  emitValue(value:string){
    this.codigoBarras.emit(value);
  }
}
