import { Component, effect, inject, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { BarraBusquedaInventario } from "../barra-busqueda-inventario/barra-busqueda-inventario";
import { ProductoService } from '../../../../core/services/producto-service';
import { ListaProductosInventario } from "../lista-productos-inventario/lista-productos-inventario";
import { Router } from '@angular/router';
import { NotificacionService } from '../../../../core/services/notificaciones/notificacion-service';

@Component({
  selector: 'app-contenedor-inventario',
  imports: [BarraBusquedaInventario, ListaProductosInventario],
  templateUrl: './contenedor-inventario.html',
  styleUrl: './contenedor-inventario.css'
})
export class ContenedorInventario implements OnChanges {

  private productosService = inject(ProductoService);
  private router = inject(Router);  
  private notificacionService = inject(NotificacionService);
  // Signal para guardar palabra clave
  productosFiltrados = signal<Producto[]>([]);
  productos= signal<Producto[]>([]);
  errorMessage = signal<string>('');
  editarProductoClic = input<number>(-1);

  indiceSeleccionado = signal<number>(-1);

  //Cargar productos al iniciar
  constructor() {
    this.cargarProductos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editarProductoClic'] && this.indiceSeleccionado() >= 0) {
      this.editarProductoSeleccionado();
    }
  }

  editarProductoSeleccionado():void{
    const producto:Producto = this.productosFiltrados()[this.indiceSeleccionado()];
    this.router.navigate(['/editar-producto', producto.id]);
  }

  onChangeIndice(n: number){
    this.indiceSeleccionado.set(n);
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


  filtrarProducto(palabraClave: string): void {
    this.productosFiltrados.set(
        this.productos().filter(p =>
        p.descripcion.toLowerCase().includes(palabraClave.toLowerCase()) ||
        p.codigoBarras.toLowerCase().trim().includes(palabraClave.toLowerCase().trim())
      )
    );
  }
}
