import { Component, inject, OnInit, output, Signal, signal } from '@angular/core';
import { ListaProductosComponent } from "../lista-productos/lista-productos-component/lista-productos-component";
import { ProductoService } from '../../../core/services/producto-service';
import { BarraBusquedaComponent } from "../barra-busqueda/barra-busqueda-component/barra-busqueda-component";
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificacionService } from '../../../core/services/notificaciones/notificacion-service';

@Component({
  selector: 'app-buscar-producto-component',
  imports: [ListaProductosComponent, BarraBusquedaComponent ],
  templateUrl: './buscar-producto-component.html',
  styles: ``
})
export class BuscarProductoComponent {
  private productosService = inject(ProductoService);
  private notificacionService = inject(NotificacionService);

  // Signal para guardar palabras clave
  productosFiltrados = signal<Producto[]>([]);
  productos= signal<Producto[]>([]);
  productoSeleccionado = signal<Producto | undefined>(undefined);
  productoSeleccionadoOutput = output<Producto>();
  errorMessage = signal<string>('');
  close = output<void>();
  indiceSeleccionado = signal<number>(-1);

  constructor() {
    this.cargarProductos();
  }

  private cargarProductos():void{
    this.productosService.getProductos().subscribe({
      next: (productos) => this.productos.set(productos),
      error: (err) => this.handleError(err)
    });
    this.productosService.getProductos().subscribe({
      next: (productos) => this.productosFiltrados.set(productos),
      error: (err) => this.handleError(err)
    });
  }

  private handleError(err: any): void {
    this.errorMessage.set("Error al obtener productos");
    console.error(err);
    this.productosFiltrados.set([]);
  }

  closeModal() {
    this.close.emit();
  }

  onTeclaArriba(event: Event) {
    console.log("Tecla arriba pulsada");
    this.navegarLista(-1);
  }

  onTeclaAbajo(event: Event) {
    console.log("Tecla abajo pulsada");
    this.navegarLista(1);
  }

  onTeclaEnter() {
    const productoSeleccionado = this.productoSeleccionado();
    if (productoSeleccionado) {
      if (productoSeleccionado.stockActual <= 0) {
        this.notificacionService.showErrorNotification("No hay existencias del producto");
        return;
      }
      this.productoSeleccionadoOutput.emit(productoSeleccionado);
      this.closeModal();
    } else {
      console.warn("No hay producto seleccionado");
    }
  }

  navegarLista(direccion: number) {
    const nuevoIndice = this.indiceSeleccionado() + direccion;
    const length = this.productosFiltrados().length;
    
    if (nuevoIndice >= 0 && nuevoIndice < length) {
      this.indiceSeleccionado.set(nuevoIndice);
      this.productoSeleccionado.set(this.productosFiltrados()[nuevoIndice]);
    } else {
      this.indiceSeleccionado.set(-1);
      this.productoSeleccionado.set(undefined);
    }
  }

  filtrarProducto(palabraClave: string): void {
    this.productosFiltrados.set(
        this.productos().filter(p =>
        p.descripcion.toLowerCase().includes(palabraClave.toLowerCase())
      )
    );
  }

  onProductoSeleccionado(producto: Producto) {
    if(producto.stockActual <= 0){
      this.notificacionService.showErrorNotification("No hay existencias del producto");
      return;
    }
    this.productoSeleccionadoOutput.emit(producto);
    this.closeModal();
  }


}