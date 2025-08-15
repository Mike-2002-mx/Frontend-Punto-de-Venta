import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../../../shared/navbar/navbar";
import { ContenedorInventario } from "../../components/contenedor-inventario/contenedor-inventario";
import { CintaOpcionesInventario } from "../../components/cinta-opciones-inventario/cinta-opciones-inventario";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-page',
  imports: [Navbar, ContenedorInventario, CintaOpcionesInventario],
  templateUrl: './inventario-page.html',
  styleUrl: './inventario-page.css'
})

export class InventarioPage {

  private router = inject(Router);
  editarProductoClic = signal<number>(0);
  
  navegarAgregarProducto() {
    this.router.navigateByUrl('/agregar-producto');
  }

  clicEditarProducto() {
    this.editarProductoClic.update(n => n+1);
  }

  navegarAjusteInventario(){
    this.router.navigateByUrl('/ajuste-inventario');
  }

}
