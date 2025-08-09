import { Injectable, signal } from '@angular/core';
import { CarritoVenta } from '../interfaces/carrito-venta';

@Injectable({
  providedIn: 'root'
})
export class CarritoVentaService {
  
  carritoSignal = signal<CarritoVenta[]>([]);

  getCarritoActual(){
    return this.carritoSignal();
  }

  addProducto(producto: CarritoVenta){
    this.carritoSignal.update(list=>[...list, producto]);
  }

  calcularTotal(): number{
    const total = this.carritoSignal().reduce((acumulado, valorActual) => acumulado + valorActual.importe, 0);
    return total;
  }

  limpiarCarrito(){
    this.carritoSignal.set([]);
  }

}
