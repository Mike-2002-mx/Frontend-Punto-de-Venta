import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-lista-productos-inventario',
  imports: [],
  templateUrl: './lista-productos-inventario.html',
  styleUrl: './lista-productos-inventario.css'
})
export class ListaProductosInventario {

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
