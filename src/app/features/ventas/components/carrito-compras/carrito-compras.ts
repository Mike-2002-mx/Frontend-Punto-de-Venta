import { Component, inject, input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { ListaProductos } from "../lista-productos/lista-productos";
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';

@Component({
  selector: 'app-carrito-compras',
  imports: [BarraBusqueda, ListaProductos],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css'
})
export class CarritoCompras implements OnChanges {

  // Servicio de productos y carrito
  private productosService = inject(ProductoService);
  private carritoActualService = inject(CarritoVentaService);

  // Escucha directamente el signal del service
  carritoVentas = this.carritoActualService.carritoSignal;
  totalVenta = signal<number>(0);

  // Contador de ventas cerradas desde el padre
  conteoVentas = input<number>(0);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conteoVentas'] && this.conteoVentas() > 0) {
      console.log("Se ha cerrado una venta, vaciando carrito...");
      this.resetCarrito();
    }
  }

  private resetCarrito() {
    this.carritoActualService.limpiarCarrito();
    this.totalVenta.set(0);
  }

  buscarProducto(codigo: string) {
    const encontrado = this.productosService.buscarPorCodigo(codigo);
    if (encontrado) {
      this.agregarAlCarrito(encontrado);
    }
  }

  agregarAlCarrito(producto: Producto) {
    const existente = this.carritoActualService.getCarritoActual()
      .find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
      existente.importe = existente.cantidad * existente.precioU;
    } else {
      this.carritoActualService.agregarAlCarrito(this.crearDetalle(producto));
    }

    this.totalVenta.set(this.carritoActualService.calcularTotal());
  }

  private crearDetalle(producto: Producto): DetalleVenta {
    return {
      id: producto.id,
      descripcion: producto.descripcion,
      exis: producto.exis,
      precioU: producto.precio_venta,
      cantidad: 1,
      importe: producto.precio_venta
    };
  }
}
