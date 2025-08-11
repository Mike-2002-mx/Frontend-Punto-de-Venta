import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { ListaProductosComponent } from "../lista-productos/lista-productos-component/lista-productos-component";
import { ProductoService } from '../../../core/services/producto-service';
import { BarraBusquedaComponent } from "../barra-busqueda/barra-busqueda-component/barra-busqueda-component";

@Component({
  selector: 'app-buscar-producto-component',
  imports: [ListaProductosComponent, BarraBusquedaComponent],
  templateUrl: './buscar-producto-component.html',
  styles: ``
})

export class BuscarProductoComponent implements OnInit {
  
  ngOnInit(): void {
    const productos = this.productosService.productos();
    this.productosFiltrados.set(productos);
  }

  productosService = inject(ProductoService);

  //Signal para guardar palabras clave
  palabraClave = signal('');
  productosFiltrados = signal<Producto[]>([]); 
  productoSeleccionado = signal<Producto|undefined>(undefined);
  productoSeleccionadoOutput = output<Producto>();
  teclaArriba = signal<Event | undefined>(undefined);
  teclaAbajo = signal<Event | undefined>(undefined);
  teclaEnter = signal<Event | undefined>(undefined);

  close = output<void>();
  
  indiceSeleccionado = signal<number>(-1);

  closeModal() {
    this.close.emit();
  }

  onTeclaArriba(event: Event){
    console.log("Tecla arriba pulsada")
    this.teclaArriba.set(event);
  }

  onTeclaAbajo(event: Event){
    console.log("Tecla abajo pulsada");
    this.teclaAbajo.set(event);
  }

  onTeclaEnter(){
    const productoSeleccionado = this.productoSeleccionado();
    if(productoSeleccionado){
      console.log("Emitiendo producto", productoSeleccionado)
      this.productoSeleccionadoOutput.emit(productoSeleccionado);
    }else{
      console.warn("algo malio sal");
    }
    this.closeModal();
  }

  navegarLista(direccion:number){
    const nuevoIndice = this.indiceSeleccionado() + direccion;
    if(nuevoIndice>=0 && nuevoIndice<this.productosFiltrados().length){
      this.indiceSeleccionado.set(nuevoIndice);
    } else{
      this.indiceSeleccionado.set(-1);
    }
  }

  filtrarProducto(palabraClave: string){
    const productos = this.productosService.buscarPorPalabraClave(palabraClave);
    console.log("Productos filtrados", productos);
    if(!productos){
      this.productosFiltrados.set([]);
      return;
    }else{
      this.productosFiltrados.update(list=> productos);
    }
  }

  onProductoSeleccionado(producto: Producto){
    this.productoSeleccionadoOutput.emit(producto);
    this.closeModal();
  }

}
