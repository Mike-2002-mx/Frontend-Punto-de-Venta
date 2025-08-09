import { Component, output } from '@angular/core';

@Component({
  selector: 'app-cinta-opciones',
  imports: [],
  templateUrl: './cinta-opciones.html',
  styleUrl: './cinta-opciones.css'
})
export class CintaOpciones {

  clicCerrarVenta = output<void>();
  clicBuscarProducto = output<void>();
  clicRemoverProducto = output<void>();

  onCerrarVenta(){
    this.clicCerrarVenta.emit();
  }

  onBuscarProducto(){
    this.clicBuscarProducto.emit();
  }

  onRemoverProducto(){
    this.clicRemoverProducto.emit();
  }

}
