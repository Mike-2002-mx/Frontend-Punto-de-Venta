import { Component, input } from '@angular/core';
import { CarritoAjuste } from '../../../../../core/interfaces/carrito-ajuste';

@Component({
  selector: 'app-lista-productos-ajuste',
  imports: [],
  templateUrl: './lista-productos-ajuste.html',
  styleUrl: './lista-productos-ajuste.css'
})
export class ListaProductosAjuste {

  carritoAjuste = input<CarritoAjuste[]>([]);

}
