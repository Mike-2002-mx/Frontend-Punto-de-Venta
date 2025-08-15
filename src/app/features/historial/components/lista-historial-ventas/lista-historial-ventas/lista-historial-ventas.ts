import { Component, input, inputBinding, output } from '@angular/core';
import { Venta } from '../../../../../core/interfaces/venta';
import { PaginatedResponse } from '../../../../../core/interfaces/paginated-response';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-historial-ventas',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './lista-historial-ventas.html',
  styleUrl: './lista-historial-ventas.css'
})
export class ListaHistorialVentas {

  listaVentas = input<Venta[]>([]);
  paginaActual = input<number>();
  totalPaginas = input<number>();

  clicAtras = output<void>();
  clicSiguiente = output<void>();

  onClicAtras() {
    this.clicAtras.emit();
  }
  onClicSiguiente() {
    this.clicSiguiente.emit();
  }

}
