import { Component, inject, input, output, Signal, signal } from '@angular/core';
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

  // carritoActualService = inject(CarritoVentaService);


  //Todo lo del modal cerrar venta
  modalCerrarVentaVisible = false;

  showModal(){
    this.modalCerrarVentaVisible=true;
  }

  hideModal() {
    console.log("Esto deberia cerrar el modal");
    this.modalCerrarVentaVisible=false;
  }

  cerrarVenta(){
    console.log("Boton Cerrar venta presionado deberia abrirse un modal para cerrar venta");
    this.modalCerrarVentaVisible=true;
  }

  buscarProducto(){
    console.log("Boton Cerrar venta presionado se deberia activar el modal de buscar producto");
  }

  removerProducto(){
    console.log("Boton Cerrar venta presionado");
  }

}