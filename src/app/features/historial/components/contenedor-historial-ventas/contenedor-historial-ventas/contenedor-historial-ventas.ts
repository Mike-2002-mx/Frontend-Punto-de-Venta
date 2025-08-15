import { Component, inject, OnInit, signal } from '@angular/core';
import { VentaService } from '../../../../../core/services/venta-service';
import { Venta } from '../../../../../core/interfaces/venta';
import { ListaHistorialVentas } from "../../lista-historial-ventas/lista-historial-ventas/lista-historial-ventas";
import { PaginatedResponse } from '../../../../../core/interfaces/paginated-response';
import { BarraBusquedaHistorial } from "../../barra-busqueda-historial/barra-busqueda-historial";


@Component({
  selector: 'app-contenedor-historial-ventas',
  imports: [ListaHistorialVentas, BarraBusquedaHistorial],
  templateUrl: './contenedor-historial-ventas.html',
  styleUrl: './contenedor-historial-ventas.css'
})
export class ContenedorHistorialVentas implements OnInit{

  ventaSevice = inject(VentaService);

  listaVentas = signal<Venta[]>([]);
  paginaActual = signal<number>(0);
  totalPaginas = signal<number>(0);
  pageSize = 10;


  cargarProductos(pagina: number){
    this.ventaSevice.getVentas(pagina, this.pageSize)
    .subscribe((response: PaginatedResponse<Venta>) =>{
      this.listaVentas.set(response.data);
      this.paginaActual.set(response.currentPage);
      this.totalPaginas.set(response.totalPages)
    });
  }

  ngOnInit(): void {
    this.cargarProductos(this.paginaActual());
  }

  siguientePagina() {
    const nuevaPagina = this.paginaActual() +1;
    const totalPaginas = this.totalPaginas();

    if (nuevaPagina < totalPaginas) {
      this.cargarProductos(nuevaPagina);
      this.paginaActual.set(nuevaPagina);
      console.log("La nueva pagina es: ", this.paginaActual());
    }
  }

  anteriorPagina() {
    const nuevaPagina = this.paginaActual() -1;

    if (nuevaPagina >= 0 ) {
      this.cargarProductos(nuevaPagina);
      this.paginaActual.set(nuevaPagina);
      console.log("La nueva pagina es: ", this.paginaActual());
    }
  }

  //Buscar por folio
  buscarVentaPorFolio(folio: string):void{
      this.ventaSevice.buscarPorFolio(folio).subscribe({
      next: (venta) => {
        this.listaVentas.set([venta]);
        this.paginaActual.set(1);
        this.totalPaginas.set(1);
      },
      error: (error) => {
        console.error('Error:', error);
        this.listaVentas.set([]);
      }
    });

  }

}
