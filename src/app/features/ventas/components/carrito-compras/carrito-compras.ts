import { Component, inject, effect , output, signal } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { ListaProductos } from "../lista-productos/lista-productos";
import { ModalCerrarVenta } from '../modal-cerrar-venta/modal-cerrar-venta';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-carrito-compras',
  imports: [BarraBusqueda, ListaProductos, ModalCerrarVenta],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css'
})
export class CarritoCompras {

  //Servicio de productos
  productosService = inject(ProductoService);


  //Carrito
  listaProductos = signal<DetalleVenta[]>([]);
  productoEncontrado = signal<Producto | undefined>(undefined);
  totalVenta = signal<number>(0);
  teclaEsc = signal<Event|undefined>(undefined);

  esVisibleModal=false;

  onTeclaEsc(event: Event){
    this.teclaEsc.set(event);
    this.showModal();
  }

  showModal() {
	  this.esVisibleModal = true;
  }

  hideModal() {
	  this.esVisibleModal = false;
    this.listaProductos.set([]);
    this.totalVenta.set(0);
    console.log("Venta realizada con fecha: ", new Date().toLocaleString());
  }

  buscarProducto(codigo: string){
    const encontrado = this.productosService.buscarPorCodigo(codigo);
    this.productoEncontrado.set(encontrado);
    //Agregar si esta 
    if(encontrado){
      this.agregarAlCarrito(encontrado);
    }
  } 

  agregarAlCarrito(producto: Producto){
    const existente = this.listaProductos().find(item => item.id===producto.id);
    if(existente){
      existente.cantidad +=1;
      existente.importe = existente.cantidad * existente.precioU;
    }else{
      const nuevoProducto = this.crearDetalle(producto);
      this.listaProductos.update(list => [...list, nuevoProducto]);
    }
    this.calcularTotal(this.listaProductos());
  }

  private crearDetalle(producto: Producto): DetalleVenta{
    const detallesVenta:DetalleVenta = {
      id:producto.id,
      descripcion:producto.descripcion,
      exis:producto.exis,
      precioU:producto.precio_venta,
      cantidad:1,
      importe:producto.precio_venta*1
    }
    return detallesVenta;
  }

  private calcularTotal(lista: DetalleVenta[]){
    const total = lista.reduce((acumulado, valorActual) => acumulado + valorActual.importe, 0); 
    this.totalVenta.update(() => total);
  }

}
