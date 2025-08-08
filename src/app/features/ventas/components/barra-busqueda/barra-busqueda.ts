import { Component, output } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda',
  imports: [],
  templateUrl: './barra-busqueda.html',
  styleUrl: './barra-busqueda.css'
})
export class BarraBusqueda {
  codigoBarras = output<string>()
  teclaEsc = output<Event>();

  emitValue(value:string){  
    this.codigoBarras.emit(value);
  }

  onTeclaEsc(event: Event){
    this.teclaEsc.emit(event);
  }
}
