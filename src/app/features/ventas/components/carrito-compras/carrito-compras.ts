import { Component, inject, input, signal, OnChanges, SimpleChanges, computed, effect } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { ListaProductos } from "../lista-productos/lista-productos";
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';
import { BarraBusquedaComponent } from "../../../../shared/buscar-producto/barra-busqueda/barra-busqueda-component/barra-busqueda-component";
import { BuscarProductoComponent } from "../../../../shared/buscar-producto/buscar-producto-component/buscar-producto-component";
import { list } from 'postcss';

@Component({
  selector: 'app-carrito-compras',
  imports: [BarraBusqueda, ListaProductos, BuscarProductoComponent],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css'
})
export class CarritoCompras implements OnChanges {

  // Servicio de productos y carrito
  private productosService = inject(ProductoService);
  private carritoActualService = inject(CarritoVentaService);

  // Escucha directamente el signal del service
  carritoVentas = this.carritoActualService.carritoSignal;
  totalVenta = signal<number>(this.carritoActualService.calcularTotal());

  // Contador de ventas cerradas desde el padre
  conteoVentas = input<number>(0);
  activarModalBuscarProducto = input<number>(0);

  modalBuscarProductoVisible = false;

  onProductoSeleccionado(producto: Producto){
    const detalleVenta:DetalleVenta = this.crearDetalle(producto);
    this.carritoActualService.agregarAlCarrito(detalleVenta);
    this.totalVenta.set(this.carritoActualService.calcularTotal());
    console.log(" agregado correctamente:", detalleVenta)
  }

  showModal(){
    this.modalBuscarProductoVisible = true;
  }

  hideModal() {
    console.log("Esto deberia cerrar el modal");
    this.modalBuscarProductoVisible=false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conteoVentas'] && this.conteoVentas() > 0) {
      console.log("Se ha cerrado una venta, vaciando carrito...");
      this.resetCarrito();
    }
    if(changes['activarModalBuscarProducto'] && this.activarModalBuscarProducto()>0){
      this.showModal();
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
