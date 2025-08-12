import { Component, effect, input, model, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { CarritoVenta } from '../../../../core/interfaces/carrito-venta';

@Component({
  selector: 'app-lista-productos',
  imports: [],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit{

  ngOnInit(): void {
    console.log("Esto esta en lista productos: ", this.carritoProductos())
  }

  indiceHover: number | null = null;

  carritoProductos = input<CarritoVenta[]>([]);
  totalVenta = input<number>();
  indiceSeleccionado = input<number>();

  actualizarIndiceClic = output<number>();
  teclaArriba = output<Event>();
  teclaAbajo = output<Event>();
  teclaMas = output<Event>();
  teclaMenos = output<Event>();
  teclaSupr = output<Event>();

  onTeclaArriba(event: Event) {
    event.preventDefault(); 
    console.log("Tecla arriba");
    this.teclaArriba.emit(event);
  }

  onTeclaAbajo(event: Event) {
    event.preventDefault();
    console.log("Tecla abajo");
    this.teclaAbajo.emit(event);
  }

  onKeyDown(event: KeyboardEvent) {
    if(event.key==='+'){
      this.teclaMas.emit(event);
    } else if(event.key === '-'){
      this.teclaMenos.emit(event);  
    } else if(event.key === 'Delete'){
      this.teclaSupr.emit(event);
    }
  }

  seleccionarIndiceProducto(indice: number) {
    console.log(indice);
    this.actualizarIndiceClic.emit(indice);
  }
  
}
