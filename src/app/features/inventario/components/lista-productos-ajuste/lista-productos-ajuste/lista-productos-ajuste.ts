import { Component, input, output, signal } from '@angular/core';
import { CarritoAjuste } from '../../../../../core/interfaces/carrito-ajuste';

@Component({
  selector: 'app-lista-productos-ajuste',
  imports: [],
  templateUrl: './lista-productos-ajuste.html',
  styleUrl: './lista-productos-ajuste.css'
})
export class ListaProductosAjuste {

  indiceHover: number | null = null;

  carritoAjuste = input<CarritoAjuste[]>([]);

  indiceSeleccionadoActual = signal(-1);

  indiceSeleccionadoOutput = output<number>();


  handleTeclaMovimiento(event: Event, direccion: 'arriba' | 'abajo') {
    event.preventDefault();
    const productos = this.carritoAjuste();
    if (!productos?.length) return;

    const paso = direccion === 'arriba' ? -1 : 1;
    const indiceActual = this.indiceSeleccionadoActual();
    const longitud = productos.length;

    let indiceNuevo = (indiceActual + paso + longitud) % longitud;

    console.log(`Índice nuevo (${direccion}):`, indiceNuevo);

    this.indiceSeleccionadoActual.set(indiceNuevo);
    this.indiceSeleccionadoOutput.emit(indiceNuevo);
  }

  onTeclaArriba(event: Event) {
      this.handleTeclaMovimiento(event, 'arriba');
  }

  onTeclaAbajo(event: Event) {
      this.handleTeclaMovimiento(event, 'abajo');
  }

  seleccionarIndice(indice: number){
    console.log("El indice seleccionado es: ", indice);
    this.indiceSeleccionadoActual.set(indice);
    this.indiceSeleccionadoOutput.emit(indice);
  }

}
