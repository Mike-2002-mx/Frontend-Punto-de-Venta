import { CurrencyPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-lista-productos-inventario',
  imports: [CurrencyPipe],
  templateUrl: './lista-productos-inventario.html',
  styleUrl: './lista-productos-inventario.css'
})
export class ListaProductosInventario {

  indiceHover: number | null = null;

  //Recibe del componente padre
  productosFiltrados = input<Producto[]>();
  
  //Manda al padre
  indiceSeleccionadoOutput = output<number>();

  //Manejar el indice seleccionado actual para poder emitir al padre
  indiceSeleccionadoActual = signal<number>(-1);

  onTeclaArriba(event: Event) {
    event.preventDefault();
    const productos = this.productosFiltrados();
    if (!productos || productos.length === 0) return;
    const indiceNuevo = this.indiceSeleccionadoActual() - 1;
    console.log('Índice nuevo (arriba):', indiceNuevo);

    if (indiceNuevo >= 0) {
      this.indiceSeleccionadoActual.set(indiceNuevo);
      this.indiceSeleccionadoOutput.emit(indiceNuevo);
    } else {
      this.indiceSeleccionadoActual.set(productos.length - 1);
      this.indiceSeleccionadoOutput.emit(productos.length - 1);
    }
  }

  onTeclaAbajo(event: Event) {
    event.preventDefault();
    const productos = this.productosFiltrados();
    if (!productos || productos.length === 0) return;

    const indiceNuevo = this.indiceSeleccionadoActual() + 1;
    console.log('Índice nuevo (abajo):', indiceNuevo);
    if (indiceNuevo < productos.length) {
      this.indiceSeleccionadoActual.set(indiceNuevo);
      this.indiceSeleccionadoOutput.emit(indiceNuevo);
    } else {
      this.indiceSeleccionadoActual.set(0);
      this.indiceSeleccionadoOutput.emit(0);
    }
  }


  seleccionarIndice(indice: number){
    console.log("El indice seleccionado es: ", indice);
    this.indiceSeleccionadoActual.set(indice);
    this.indiceSeleccionadoOutput.emit(indice);
  }


}
