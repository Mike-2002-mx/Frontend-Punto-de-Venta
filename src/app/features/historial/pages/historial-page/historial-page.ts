import { Component } from '@angular/core';
import { Navbar } from "../../../../shared/navbar/navbar";
import { ContenedorHistorialVentas } from "../../components/contenedor-historial-ventas/contenedor-historial-ventas/contenedor-historial-ventas";

@Component({
  selector: 'app-historial-page',
  imports: [Navbar, ContenedorHistorialVentas],
  templateUrl: './historial-page.html',
  styleUrl: './historial-page.css'
})
export class HistorialPage {

}
