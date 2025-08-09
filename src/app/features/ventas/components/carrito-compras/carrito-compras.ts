import { Component, inject, effect , output, signal, input } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { ListaProductos } from "../lista-productos/lista-productos";
import { ModalCerrarVenta } from '../modal-cerrar-venta/modal-cerrar-venta';
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';

@Component({
  selector: 'app-carrito-compras',
  imports: [BarraBusqueda, ListaProductos, ModalCerrarVenta],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css'
})
export class CarritoCompras {

  //Servicio de productos
  productosService = inject(ProductoService);
  carritoActualService = inject(CarritoVentaService);

  //Carrito
  listaProductos = signal<DetalleVenta[]>([]);
  carritoVentas = this.carritoActualService.getCarritoActual();
  totalVenta = signal<number>(0);
  pagoCon = signal<number>(0);
  cambio = signal<number>(0);

  esVisibleModal=false;

  onTeclaEsc(){
    this.esVisibleModal = true;
  }


  onPagoCon(n:number){
    this.pagoCon.set(n);
    console.log("Pago con: ", this.pagoCon())
  }

  onCambio(n:number){
    this.cambio.set(n);
  }

  hideModal() {
    console.log("Venta realizada con fecha: ", new Date().toLocaleString(),
    "\nTotal: ", this.totalVenta(),
    "\nPago Con", this.pagoCon(),
    "\nCambio", this.cambio());
    this.carritoActualService.limpiarCarrito();
    this.carritoActualService.carritoSignal.set([]);
    this.esVisibleModal = false;
    this.listaProductos.set([]);
    this.totalVenta.set(0);
  }

  buscarProducto(codigo: string){
    const encontrado = this.productosService.buscarPorCodigo(codigo);
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

      this.carritoActualService.addProducto(nuevoProducto);//Agregar producto a carritoActual
      this.listaProductos.update(list => [...list, nuevoProducto]);
      console.log("Se agrego a carrito actual: ", this.carritoActualService.getCarritoActual())
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
