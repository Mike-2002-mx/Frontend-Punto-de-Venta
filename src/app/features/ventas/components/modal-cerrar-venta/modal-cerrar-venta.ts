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
  totalVenta = input<number|undefined>(undefined);
  pagoCon = signal(this.totalVenta());
  cambio = signal<number|undefined>(this.totalVenta());

  @ViewChild('pagoConTxt') pagoConTxt!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.pagoConTxt.nativeElement.focus();
    this.pagoConTxt.nativeElement.select();
  }

  closeModal() {
    this.close.emit();
  }

  calcularCambio(pagoCon:number){
    const total = this.totalVenta();
    if(total!=undefined){
      this.cambio.set(pagoCon-total);
      console.log(this.cambio());
    }else{
      console.log("El cambio no puede ser negativo")
    }
  }
}
