import { Component, signal } from '@angular/core';
import { CintaOpcionesAjuste } from "../../../components/cinta-opciones-ajuste/cinta-opciones-ajuste/cinta-opciones-ajuste";
import { ContenedorAjuste } from "../../../components/contenedor-ajuste/contenedor-ajuste";

@Component({
  selector: 'app-ajuste-inventario-page',
  imports: [CintaOpcionesAjuste, ContenedorAjuste],
  templateUrl: './ajuste-inventario-page.html',
  styleUrl: './ajuste-inventario-page.css'
})
export class AjusteInventarioPage {

  clicCerrarAjuste = signal<number>(-1);
  clicBuscarProducto = signal<number>(-1);

  onClicCerrarAjuste() {
    this.clicCerrarAjuste.update(n => n+1);
  }

  onClicBuscarProducto() {
    this.clicBuscarProducto.update(n => n+1);
  }
}
