import { Component, output } from '@angular/core';

@Component({
  selector: 'app-cinta-opciones-ajuste',
  imports: [],
  templateUrl: './cinta-opciones-ajuste.html',
  styleUrl: './cinta-opciones-ajuste.css'
})
export class CintaOpcionesAjuste {

  clicCerrarAjuste = output<void>();
  clicBuscarProducto= output<void>();
  clicRemoverProducto = output<void>();

  onCerrarAjuste() {
    this.clicCerrarAjuste.emit();
  }
  onBuscarProducto() {
    this.clicBuscarProducto.emit();
  }
  onRemoverProducto() {
    this.clicRemoverProducto.emit();
  }

}
