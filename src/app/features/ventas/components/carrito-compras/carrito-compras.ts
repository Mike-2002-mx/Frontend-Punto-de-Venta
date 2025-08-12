import { Component, inject, input, signal, OnChanges, SimpleChanges, computed, effect, HostListener, ViewChild, ElementRef, Signal } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto-service';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { ListaProductos } from "../lista-productos/lista-productos";
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';
import { BuscarProductoComponent } from "../../../../shared/buscar-producto/buscar-producto-component/buscar-producto-component";
import { toSignal } from '@angular/core/rxjs-interop';
import { CarritoVenta } from '../../../../core/interfaces/carrito-venta';
import { tap } from 'rxjs/operators';

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

  indiceSeleccionado = signal<number>(-1);

  // Contador de ventas cerradas desde el padre
  conteoVentas = input<number>(0);
  activarModalBuscarProducto = input<number>(0);
  productoRemovido = input<number>(0);

  modalBuscarProductoVisible = false;

  onProductoSeleccionado(producto: Producto){
    const detalleVenta:DetalleVenta = this.crearDetalle(producto);
    this.carritoActualService.agregarAlCarrito(detalleVenta);
    this.totalVenta.set(this.carritoActualService.calcularTotal());
    console.log(" agregado correctamente:", detalleVenta)
  }

  onActualizarIndiceConCli(n: number) {
    this.indiceSeleccionado.set(n);
  }

  showModal(){
    this.modalBuscarProductoVisible = true;
  }

  hideModal() {
    console.log("Esto deberia cerrar el modal");
    this.modalBuscarProductoVisible=false;
  }

  @ViewChild(BarraBusqueda) barraBusqueda!: BarraBusqueda;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conteoVentas'] && this.conteoVentas() > 0) {
      console.log("Se ha cerrado una venta, vaciando carrito...");
      this.barraBusqueda.resetCodigoInput();
      this.resetCarrito();
    }
    if(changes['activarModalBuscarProducto'] && this.activarModalBuscarProducto()>0){
      this.showModal();
    }
    if(changes['productoRemovido'] && this.indiceSeleccionado()>=0){
      this.removerProducto();
    }
  }

  navegarLista(direccion:number){
    const nuevoIndice = this.indiceSeleccionado() + direccion;
    console.log("El indice ahora es: ", nuevoIndice);
    if(nuevoIndice>=0 && nuevoIndice<this.carritoVentas().length){
      this.indiceSeleccionado.set(nuevoIndice);
    } else{
      this.indiceSeleccionado.set(-1);
    }
  }

  //Gestión del carrito
  private resetCarrito() {
    this.carritoActualService.limpiarCarrito();
    this.totalVenta.set(0);
  }

  sumarAlCarrito(){
    const existente = this.carritoActualService.getCarritoActual()[this.indiceSeleccionado()];
    if(existente.cantidad >= existente.exis){
      console.log("Ya no hay existencias");
      return;
    }else{
      existente.cantidad +=1;
      existente.importe = existente.cantidad * existente.precioU;
    }
    this.totalVenta.set(this.carritoActualService.calcularTotal());
  }

  restarAlCarrito(){
    const existente = this.carritoActualService.getCarritoActual()[this.indiceSeleccionado()];
    if(existente.cantidad>1){
      existente.cantidad -=1;
      existente.importe = existente.cantidad * existente.precioU;
    }
    this.totalVenta.set(this.carritoActualService.calcularTotal());
  }

  removerProducto() {
    const indice = this.indiceSeleccionado();
    this.carritoVentas.update(productos => {
      if (indice < 0 || indice >= productos.length) return productos; 
      const nuevosProductos = productos.filter((_, i) => i !== indice);
      
      this.indiceSeleccionado.set(
        nuevosProductos.length > 0
          ? Math.max(0, indice - 1) 
          : -1
      );
      return nuevosProductos;
    });
    this.totalVenta.set(this.carritoActualService.calcularTotal());
  }

buscarProducto(codigo: string) {
  console.log("Codigo",codigo);
  this.productosService.buscarPorCodigo(codigo)
    .pipe(
      tap(producto => {
        if (producto) {
          this.agregarAlCarrito(producto);
        }
      })
    )
    .subscribe();
}

  agregarAlCarrito(producto: Producto) {
    if (!producto || typeof producto.id === "undefined") {

      console.error(producto, "Producto inválido, no se puede agregar al carrito");
      return;
    }

    const carrito = this.carritoActualService.getCarritoActual();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      // Validar existencias
      if (existente.cantidad >= existente.exis) {
        console.warn(`No hay más existencias de: ${producto.descripcion ?? "Producto sin nombre"}`);
        return;
      }

      existente.cantidad += 1;
      existente.importe = existente.cantidad * (existente.precioU ?? 0);

    } else {
      this.carritoActualService.agregarAlCarrito(this.crearDetalle(producto));
    }

    this.totalVenta.set(this.carritoActualService.calcularTotal());
  }

  private crearDetalle(producto: Producto): DetalleVenta {
    return {
      id: producto.id,
      descripcion: producto.descripcion,
      exis: producto.stockActual,
      precioU: producto.precioVenta,
      cantidad: 1,
      importe: producto.precioVenta
    };
  }

  //
  @HostListener('window:keydown', ['$event'])
  onCtrlB(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      this.showModal();
    }
  }

}
