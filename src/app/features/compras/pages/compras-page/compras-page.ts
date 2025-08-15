import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../../../shared/navbar/navbar";
import { VentaService } from '../../../../core/services/venta-service';
import { Venta } from '../../../../core/interfaces/venta';

@Component({
  selector: 'app-compras-page',
  imports: [Navbar],
  templateUrl: './compras-page.html',
  styleUrl: './compras-page.css'
})
export class ComprasPage  {

  //Borrar esto eventualmente
  ventaService = inject(VentaService);

  ventas = signal<Venta[]>([]);

  constructor(){
    const ventas = this.ventaService.getVentas(0, 20).subscribe({
      next: ventas => console.log(ventas),
      error: err => console.log(err)
    })
  }


}
