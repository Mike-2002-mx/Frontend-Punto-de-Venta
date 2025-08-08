import { Component } from '@angular/core';
import { CarritoCompras } from "../../components/carrito-compras/carrito-compras";
import { Navbar } from "../../../../shared/navbar/navbar";

@Component({
  selector: 'app-ventas-page',
  imports: [CarritoCompras, Navbar],
  templateUrl: './ventas-page.html',
  styleUrl: './ventas-page.css'
})
export class VentasPage {

}
