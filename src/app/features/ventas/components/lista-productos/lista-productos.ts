import { Component, effect, input, model, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';

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
  carritoProductos = input<DetalleVenta[]>([]);

  totalVenta = input<number>();
}
