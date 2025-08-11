import { Component, HostListener, inject, input, output, Signal, signal, ViewChild } from '@angular/core';
import { CarritoCompras } from "../../components/carrito-compras/carrito-compras";
import { Navbar } from "../../../../shared/navbar/navbar";
import { CintaOpciones } from "../../components/cinta-opciones/cinta-opciones";
import { ModalCerrarVenta } from '../../components/modal-cerrar-venta/modal-cerrar-venta';
import { CarritoVentaService } from '../../../../core/services/carrito-venta-service';

@Component({
  selector: 'app-ventas-page',
  imports: [CarritoCompras, Navbar, CintaOpciones, ModalCerrarVenta],
  templateUrl: './ventas-page.html',
  styleUrl: './ventas-page.css'
})
export class VentasPage {

  carritoService = inject(CarritoVentaService);

  //Todo lo del modal cerrar venta
  modalCerrarVentaVisible = false;
  ventaCerrada = signal<number>(0);
  modalProducto = signal<number>(0);
  numeroProductoRemovido = signal<number>(0);

  showModal(){
    this.modalCerrarVentaVisible=true;
  }

  hideModal() {
    console.log("Esto deberia cerrar el modal");
    this.modalCerrarVentaVisible=false;
  }

  onVentaCerrada(){
    this.ventaCerrada.update(n => n+1);
    console.log("Venta del dia número: ", this.ventaCerrada());
  }

  cerrarVenta(){
    console.log("Boton Cerrar venta presionado deberia abrirse un modal para cerrar venta");
      if(this.carritoService.getCarritoActual().length<=0){
        alert("No se pueden cerrar venta sin productos")
        return;
      }
    this.showModal(); 
  }

  buscarProducto(){
    console.log("Boton buscar producto presionado se deberia activar el modal de buscar producto");
    this.modalProducto.update(n => n+1);
  }

  removerProducto(){
    this.numeroProductoRemovido.update(n => n+1);
    console.log("Ventas page ha escuchado supr", this.numeroProductoRemovido());
  }

  @HostListener('window:keydown.escape', ['$event'])
    onEsc(event: Event) {
      if(this.carritoService.getCarritoActual().length<=0){
        alert("No se pueden cerrar venta sin productos")
        return;
      }
      this.showModal();
    }

}