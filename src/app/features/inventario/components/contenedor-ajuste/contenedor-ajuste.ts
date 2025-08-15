import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges, viewChild } from '@angular/core';
import { BarraBusqueda } from "../../../ventas/components/barra-busqueda/barra-busqueda";
import { ListaProductosAjuste } from "../lista-productos-ajuste/lista-productos-ajuste/lista-productos-ajuste";
import { CarritoAjuste } from '../../../../core/interfaces/carrito-ajuste';
import { ProductoService } from '../../../../core/services/producto-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAjuste } from '../modal-ajuste/modal-ajuste';
import { MotivoAjusteComponent } from "../motivo-ajuste/motivo-ajuste-component/motivo-ajuste-component";
import { ModalCerrarAjuste } from '../modal-cerrar-ajuste/modal-cerrar-ajuste';
import { BuscarProductoComponent } from "../../../../shared/buscar-producto/buscar-producto-component/buscar-producto-component";

@Component({
  selector: 'app-contenedor-ajuste',
  imports: [BarraBusqueda, ListaProductosAjuste, MotivoAjusteComponent, BuscarProductoComponent],
  templateUrl: './contenedor-ajuste.html',
  styleUrl: './contenedor-ajuste.css'
})
export class ContenedorAjuste implements OnInit, OnChanges {

  productoService = inject(ProductoService);
  dialog = inject(MatDialog);

  productos= signal<Producto[]>([]);
  errorMessage = signal<string>('');
  carritoAjuste = signal<CarritoAjuste[]>([]);
  nuevaExistencia = signal<number>(-1);
  motivoAjuste = signal<string>('');
  indiceSeleccionado = signal<number>(-1);

  modalBuscarProductoVisible = false;

  clicCerrarAjuste = input<number>(-1);
  clicBuscarProducto = input<number>(-1);
  clicRemoverProducto = input<number>(-1);

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => this.productos.set(productos),
      error: (err) => this.handleError(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clicCerrarAjuste'] && this.clicCerrarAjuste()>=0){
      this.openModalCerrarAjuste();
    }
    if(changes['clicBuscarProducto'] && this.clicBuscarProducto()>=0){
      this.showModalProducto();
    }
    if(changes['clicRemoverProducto'] && this.clicRemoverProducto()>=0){
      console.log("Esto deberia remover producto seleccionado");
      const indice = this.indiceSeleccionado();
      console.log("Indice seleccionado: ", indice);
      if(indice>=0){
        this.removerProducto(indice);
      }else{
        console.log("No hay indice seleccionado");
      }
    }
  }

  openModalCerrarAjuste():void{
    //Validar que tenga al menos una palabra
    if (!/\p{L}+/u.test(this.motivoAjuste().trim())) {
      alert('Debe ingresar el motivo');
      return;
    }
    const carrito = this.carritoAjuste();
    if(carrito.length === 0){
      alert('Debe haber al menos un producto para ajustar');
      return;
    }

    const positivo = carrito.filter(p => p.subtotal >0)
    .reduce((acc, p) => acc + p.subtotal, 0);

    const negativo = carrito.filter(p => p.subtotal<0)
    .reduce((valorPrevio, itemActual) => valorPrevio + itemActual.subtotal, 0);

    const general = positivo + negativo;

    const dialogRef = this.dialog.open(ModalCerrarAjuste, {
      data: {
        totalNegativo: negativo,
        totalPositivo: positivo,
        totalGeneral: general,
        motivo: this.motivoAjuste()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Se ha cerrado el ajuste");
      this.carritoAjuste.set([]);
      this.motivoAjuste.set('');
    })
  }


  // Modificar el openModal para manejar la lógica completa
  openModalNuevaCantidad(stockActual: number, producto?: Producto): void {
    const dialogRef = this.dialog.open(ModalAjuste, {
      data: {
        stockActual: stockActual
      }
    });

    dialogRef.afterClosed().subscribe(valor => {
      if (valor !== undefined) { 
        console.log('Valor recibido:', valor);
        this.nuevaExistencia.set(valor);
        
        // Aquí sabemos que ya tenemos el valor, podemos crear el ajuste
        if (producto) {
          const productoAjustado = this.productoToAjuste(producto);
          if(productoAjustado) {  
            this.carritoAjuste.update(list => [...list, productoAjustado]);
          }
        }
      }
    });
  }


  agregarPorCodigo(codigo: string) {
    const producto = this.productos().find(p => p.codigoBarras ===codigo);
    if(producto){
      const stockActual = producto.stockActual;
      this.openModalNuevaCantidad(stockActual, producto);
    }else{
      alert("No existe producto");
    }
  }

  productoToAjuste(producto: Producto): CarritoAjuste{
    const carritoAjuste:CarritoAjuste= {
      descripcion: producto.descripcion,
      existenciaAnterior:producto.stockActual,
      nuevaExistencia:this.nuevaExistencia(),
      diferencia:this.nuevaExistencia() - producto.stockActual,
      precioU: producto.precioVenta,
      subtotal:producto.precioVenta * (this.nuevaExistencia() - producto.stockActual)
    }
    return carritoAjuste;
  }

  agregarMotivo(motivo: string) {
    this.motivoAjuste.set(motivo);
  }

  //Buscar producto para agregar
  showModalProducto(){
    this.modalBuscarProductoVisible=true;
  }
  
  onProductoSeleccionado(producto: Producto){
    console.log("El producto que se deberia agregar al carrito de ajuste es: ", producto);
    const stockActual = producto.stockActual;
    this.openModalNuevaCantidad(stockActual, producto);
  }

  hideModal(){
    this.modalBuscarProductoVisible = false;
  }
  
  //Remover producto 
  onIndiceSeleccionado(n:number){
    console.log("Actualizando indice seleccionado a: ", n);
    this.indiceSeleccionado.set(n);
  }
  removerProducto(n: number): void {
      this.carritoAjuste.update(currentItems => 
          currentItems.filter((_, index) => index !== n)
      );
  }

  private handleError(err: any): void {
    this.errorMessage.set("Error al obtener productos");
    console.error(err);
    this.productos.set([]);
  }
}
