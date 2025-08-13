import { Component } from '@angular/core';
import { Navbar } from "../../../../shared/navbar/navbar";
import { ContenedorInventario } from "../../components/contenedor-inventario/contenedor-inventario";

@Component({
  selector: 'app-inventario-page',
  imports: [Navbar, ContenedorInventario],
  templateUrl: './inventario-page.html',
  styleUrl: './inventario-page.css'
})
export class InventarioPage {

}
