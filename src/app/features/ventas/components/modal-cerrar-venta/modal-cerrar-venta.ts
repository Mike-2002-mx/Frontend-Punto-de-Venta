import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';

@Component({
  selector: 'app-modal-cerrar-venta',
  imports: [],
  templateUrl: './modal-cerrar-venta.html',
  styleUrl: './modal-cerrar-venta.css'
})
export class ModalCerrarVenta {

  //Injectamos servicio de carrito actual para saber que productos estan en el carrito de venta
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
  isVentaCerrada = output<void>();

  calcularCambio(pagoCon: number): void {
    // Validación básica del input
    if (typeof pagoCon !== 'number' || isNaN(pagoCon)) {
      console.error("Error: Debes ingresar un valor numérico válido");
      this.cambio.set(0);
      return;
    }
    const total = this.totalVenta;
    // Cálculo del cambio
    const cambio = pagoCon - total;
    // // Manejo de pago insuficiente
    if (cambio < 0) {
      console.warn("Advertencia: El pago es insuficiente. Faltan $" + Math.abs(cambio).toFixed(2));
    }
    // // Asignación de valores
    this.pagoCon.set(pagoCon);
    this.cambio.set(cambio);

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
    const pago = this.pagoCon();
    const cambio = this.cambio();

    if (typeof pago !== 'number' || isNaN(pago)) {
      console.error("Pago inválido, no se puede cerrar la venta");
      return;
    }

    if (typeof cambio !== 'number' || isNaN(cambio)) {
      console.error("Cambio inválido, no se puede cerrar la venta");
      return;
    }

    if (pago < this.totalVenta) {
      console.warn("Pago insuficiente, no se puede cerrar la venta");
      return;
    }

    console.log("Emitiendo pago:", pago);
    console.log("Emitiendo cambio:", cambio);

    this.pagoConOutput.emit(pago);
    this.cambioOutput.emit(cambio);
    this.isVentaCerrada.emit();
    this.carritoActualService.carritoSignal.set([]);
    this.close.emit();
  }


}
