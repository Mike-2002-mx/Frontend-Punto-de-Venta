import { Component, output } from '@angular/core';

@Component({
  selector: 'app-cinta-opciones-inventario',
  imports: [],
  templateUrl: './cinta-opciones-inventario.html',
  styleUrl: './cinta-opciones-inventario.css'
})
export class CintaOpcionesInventario {

  clicAgregarProducto = output<void>();
  clicEditarProducto = output<void>();
  clicAjusteInventario = output<void>();

  onAgregarProducto() {
    this.clicAgregarProducto.emit();
  }
  onEditarProducto() {
    this.clicEditarProducto.emit();
  }
  onAjusteInventario() {
    this.clicAjusteInventario.emit();
  }
}
