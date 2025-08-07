import { Component, ElementRef, input, OnInit, output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-productos-component',
  imports: [],
  templateUrl: './lista-productos-component.html',
  styleUrl: './lista-productos-component.css'
})
export class ListaProductosComponent {
  //Recibe del componente padre
  productosFiltrados = input<Producto[]>();

  //Manda al padre
  productoSeleccionado = output<Producto>();

    // Índice del producto seleccionado
  indiceSeleccionado = signal<number>(-1);

  // Referencia al host para escuchar eventos de teclado
  @ViewChild('listaRef') listaRef!: ElementRef;

  ngAfterViewInit(): void {
    // Enfocar la lista para capturar teclas
    this.listaRef.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent): void {
    const productos = this.productosFiltrados();
    if (!productos || productos.length === 0) return;

    const max = productos.length - 1;
    let index = this.indiceSeleccionado();

    if (event.key === 'ArrowDown') {
      index = index < max ? index + 1 : 0;
      this.indiceSeleccionado.set(index);
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      index = index > 0 ? index - 1 : max;
      this.indiceSeleccionado.set(index);
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (index >= 0 && index <= max) {
        this.productoSeleccionado.emit(productos[index]);
        console.log(productos[index]);
        this.indiceSeleccionado.set(-1);
      }
    }
  }

  onSeleccionarProducto(producto: Producto){
    this.productoSeleccionado.emit(producto);
    console.log(producto);
  }
}
