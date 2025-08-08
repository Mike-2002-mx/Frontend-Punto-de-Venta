import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, effect, ElementRef, input, OnInit, output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-cerrar-venta',
  imports: [],
  templateUrl: './modal-cerrar-venta.html',
  styleUrl: './modal-cerrar-venta.css'
})
export class ModalCerrarVenta implements OnInit, AfterViewInit {

  ngOnInit(): void {
    console.log("Total venta es: ", this.totalVenta());
    this.pagoCon.set(this.totalVenta());
    console.log("Pago con: " , this.pagoCon());
    this.cambio.set(0);
    console.log("Cambio es: ", this.cambio());
  }
  
  close = output<void>();
  totalVenta = input.required<number>();
  pagoCon = signal<number>(0);
  cambio = signal<number>(0);

  pagoConOutput = output<number>();
  cambioOutput = output<number>();

  @ViewChild('pagoConTxt') pagoConTxt!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.pagoConTxt.nativeElement.focus();
    this.pagoConTxt.nativeElement.select();
  }

  closeModal() {
    const pago= this.pagoCon();
    const cambio = this.cambio();
    if(pago && cambio){
      console.log("Emitiendo pago: ", pago);
      console.log("Emitiendo cambio: ", cambio);
      this.pagoConOutput.emit(pago);
      this.cambioOutput.emit(cambio);
    } 
    this.close.emit();
  }

  //Hacer más robusto este método
  calcularCambio(pagoCon:number){
    const total = this.totalVenta();
    if(isNaN(pagoCon)){
      const pago = total;
      this.pagoCon.set(pago);
      this.cambio.set(0);
      alert("Ingrese un valor");
      return;
    }
    const cambio = pagoCon-total;
    if(cambio<0){
      console.warn("El pago es insuficiente");
    }
    if(total!=undefined){
      this.pagoCon.set(pagoCon);
      this.cambio.set(cambio);
      console.log(this.cambio());
    }
  }
}
