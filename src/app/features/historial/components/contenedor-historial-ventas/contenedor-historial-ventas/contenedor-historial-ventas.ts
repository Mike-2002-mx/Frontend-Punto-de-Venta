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
  fechaInicio = signal<string>('');
  fechaFin = signal<string>('');
  esBusquedaPorFecha = false;


  cargarProductos(pagina: number){
    this.ventaSevice.getVentas(pagina, this.pageSize)
    .subscribe((response: PaginatedResponse<Venta>) =>{
      this.listaVentas.set(response.data);
      this.paginaActual.set(response.currentPage);
      this.totalPaginas.set(response.totalPages)
    });
    this.esBusquedaPorFecha = false;
  }

  cargarProductosPorFecha(fechaInicio: string, fechaFin: string, pagina: number){
    this.ventaSevice.buscarPorFechas(fechaInicio, fechaFin, pagina, this.pageSize)
    .subscribe((response: PaginatedResponse<Venta>) =>{
      this.listaVentas.set(response.data);
      this.paginaActual.set(response.currentPage);
      this.totalPaginas.set(response.totalPages);
      this.fechaInicio.set(fechaInicio);
      this.fechaFin.set(fechaFin);
    });
    this.esBusquedaPorFecha = false;
  }

  ngOnInit(): void {
    this.cargarProductos(this.paginaActual());
  }

  siguientePagina() {
    const nuevaPagina = this.paginaActual() +1;
    const totalPaginas = this.totalPaginas();

    if (nuevaPagina < totalPaginas) {
      if(this.esBusquedaPorFecha){
        this.cargarProductosPorFecha(this.fechaInicio(), this.fechaFin(), nuevaPagina);
      }else{
        this.cargarProductos(nuevaPagina);
      }
      this.paginaActual.set(nuevaPagina);
      console.log("La nueva pagina es: ", this.paginaActual());
    }
  }

  anteriorPagina() {
    const nuevaPagina = this.paginaActual() -1;
    if (nuevaPagina >= 0 ) {
      if(this.esBusquedaPorFecha){
        this.cargarProductosPorFecha(this.fechaInicio(), this.fechaFin(), nuevaPagina);
      }else{
        this.cargarProductos(nuevaPagina);
      }
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

  //Buscar por fechas
  onBuscarFechas(data: {fechaInicio: string, fechaFin: string}){
    const fechaInicio = data.fechaInicio
    const fechaFin =  data.fechaFin
    this.cargarProductosPorFecha(fechaInicio, fechaFin, 0);
    this.esBusquedaPorFecha = true;
  }


}
