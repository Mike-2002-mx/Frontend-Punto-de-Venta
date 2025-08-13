import { Component, output } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda-inventario',
  imports: [],
  templateUrl: './barra-busqueda-inventario.html',
  styleUrl: './barra-busqueda-inventario.css'
})
export class BarraBusquedaInventario {
  
  palabraClave = output<string>();
  teclaArriba = output<Event>();
  teclaAbajo = output<Event>();
  teclaEnter = output<Event>();

  onTeclaArriba(event: Event) {
    event.preventDefault(); 
    this.teclaArriba.emit(event);
  }

  onTeclaAbajo(event: Event) {
    event.preventDefault();
    this.teclaAbajo.emit(event);
  }

  onTeclaEnter(event: Event) {
    event.preventDefault(); 
    this.teclaEnter.emit(event);
  }
}
