import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, effect, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';

@Component({
  selector: 'app-modal-cerrar-venta',
  imports: [],
  templateUrl: './modal-cerrar-venta.html',
  styleUrl: './modal-cerrar-venta.css'
})
export class ModalCerrarVenta {

  carritoActualService = inject(CarritoVentaService);

  ngOnInit(): void {
    console.log("Total venta es: ", this.totalVenta);
    this.pagoCon.set(this.totalVenta);
    console.log("Pago con: " , this.pagoCon());
    this.cambio.set(0);
    console.log("Cambio es: ", this.cambio());
  }
  
  close = output<void>();
  totalVenta = this.carritoActualService.calcularTotal();
  pagoCon = signal<number>(0);
  cambio = signal<number>(0);
  pagoConOutput = output<number>();
  cambioOutput = output<number>();
  totalVentaOuput = output<number>();

    // Hacer más robusto este método
  calcularCambio(pagoCon:number){
    const total = this.totalVenta;
    if(isNaN(pagoCon)){
      const pago = total;
      this.pagoCon.set(pago);
      this.cambio.set(0);
      console.log("Deberias ingresar un valor")
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

  //Esto es para dejar valor por defecto el input y 
  //que ya se encuentre seleccionado para facilidad
  @ViewChild('pagoConTxt') pagoConTxt!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.pagoConTxt.nativeElement.focus();
    this.pagoConTxt.nativeElement.select();
  }

  closeModal() {
    this.close.emit();
  }

  cerrarVenta() {
    const pago= this.pagoCon();
    const cambio = this.cambio();
    if(pago && cambio){
      console.log("Emitiendo pago: ", pago);
      console.log("Emitiendo cambio: ", cambio);
      this.pagoConOutput.emit(pago);
      this.cambioOutput.emit(cambio);
    } 
    //Logica para guardar la venta
    this.carritoActualService.limpiarCarrito();
    this.close.emit();
  }





}
