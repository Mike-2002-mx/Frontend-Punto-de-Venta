import { Component, inject, output, signal } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';

@Component({
  selector: 'app-barra-busqueda-component',
  imports: [],
  templateUrl: './barra-busqueda-component.html',
  styleUrl: './barra-busqueda-component.css'
})
export class BarraBusquedaComponent {
  
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
