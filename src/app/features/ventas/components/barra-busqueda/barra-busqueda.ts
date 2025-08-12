import { Component, ElementRef, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda',
  imports: [],
  templateUrl: './barra-busqueda.html',
  styleUrl: './barra-busqueda.css'
})
export class BarraBusqueda {
  codigoBarras = output<string>();

  emitValue(value:string){  
    console.log("Codigo emitido", value);
    this.codigoBarras.emit(value);
  }

  //Esto es para dejar valor por defecto el input y 
  //que ya se encuentre seleccionado para facilidad
  @ViewChild('txtCodigo') inputCodigo!: ElementRef<HTMLInputElement>;
  resetCodigoInput() {
    "se deberia resetear todo"
    if (this.inputCodigo) {
      this.inputCodigo.nativeElement.value = ''; 
      this.inputCodigo.nativeElement.focus();
      this.inputCodigo.nativeElement.select();
    }
  }

}
