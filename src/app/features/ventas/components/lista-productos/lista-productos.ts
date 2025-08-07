import { Component, effect, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lista-productos',
  imports: [],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    console.log("COmponente hijo: ", this.carritoProductos())
  }
  ngOnInit(): void {
    console.log(this.carritoProductos())
  }

  //Producto encontrado en carrito-compras
  carritoProductos = input<DetalleVenta[]
  >([]);

  //Total
  totalVenta = input<number>();




}
