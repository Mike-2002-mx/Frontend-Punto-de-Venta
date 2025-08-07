import { Component, effect, inject, OnInit, signal } from '@angular/core';
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

  //Todos los productos del service 
  productosService = inject(ProductoService);

  //Signal para guardar palabras clave
  palabraClave = signal('');
  productosFiltrados = signal<Producto[]>([]); 

  //Actualizar palabra clave
  onActualizarPalabra(palabra: string){
    this.palabraClave.update(() => palabra);
    this.filtrarProductos();
  }
  
  //Logica para filtrar productos
  filtrarProductos() {
    const productos = this.productosService.productos();
    const palabra = this.palabraClave().toLowerCase().trim();
    
    if (!productos) {
      this.productosFiltrados.set([]);
      return;
    }

    if (!palabra || palabra === '') {
      this.productosFiltrados.set(productos);
      return;
    }

    const filtrados = productos.filter(p =>
      p.descripcion.toLowerCase().includes(palabra)
    );
    this.productosFiltrados.set(filtrados);
  }
}
