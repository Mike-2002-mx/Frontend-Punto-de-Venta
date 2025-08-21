import { Component, ElementRef, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista-productos-component',
  imports: [CurrencyPipe],
  templateUrl: './lista-productos-component.html',
  styleUrl: './lista-productos-component.css'
})
export class ListaProductosComponent {

  indiceHover: number | null = null;
  //Recibe del componente padre
  productosFiltrados = input<Producto[]>();
  indiceSeleccionado = input<number>();

  //Manda al padre
  productoSeleccionado = output<Producto>();

  seleccionarProducto(producto: Producto){
    this.productoSeleccionado.emit(producto);
  }

}
