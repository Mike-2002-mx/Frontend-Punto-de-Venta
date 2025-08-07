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
}
