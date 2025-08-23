import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../core/interfaces/categoria';
import { CategoriaService } from '../../../../core/services/categoria/categoria-service';
import { ProveedorService } from '../../../../core/services/proveedor/proveedor-service';
import { Proveedor } from '../../../../core/interfaces/proveedor';
import { ProductoRequest } from '../../interfaces/producto-request';
import { ProductoService } from '../../../../core/services/producto-service';
import { NotificacionService } from '../../../../core/services/notificaciones/notificacion-service';

@Component({
  selector: 'app-agregar-producto-component',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-producto-component.html',
  styleUrl: './agregar-producto-component.css'
})
export class AgregarProductoComponent {

  productoForm: FormGroup;

  categoriaService = inject(CategoriaService);
  proveedorService = inject(ProveedorService);
  productoService = inject(ProductoService);
  notificacionService = inject(NotificacionService);
  
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      codigoBarras: ['', [Validators.required, Validators.maxLength(20)]],
      idCategoria: [null, Validators.required],
      idProveedor: [null, Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      precioVenta: [0, [Validators.required, Validators.min(0.01)]],
      precioCompra: [0, [Validators.required, Validators.min(0.01)]],
      stockActual: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data
    );
    this.proveedorService.getProveedores().subscribe(
      data => this.proveedores = data
    );
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const formData:ProductoRequest = this.productoForm.value;

      formData.idCategoria = Number(formData.idCategoria);
      formData.idProveedor = Number(formData.idProveedor);
      formData.stockActual = Number(formData.stockActual);
      formData.stockMinimo = Number(formData.stockMinimo);

      console.log("Data enviada al backend", formData);

      this.productoService.agregarProducto(formData).subscribe({
        next: (response) => {
          this.notificacionGuardadoCorrecto();
          this.productoForm.reset();
        },
        error: (err) => {
          this.notificacionError(err.error.message);
          console.error('Error al crear producto:', err.error.message);
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    Object.keys(this.productoForm.controls).forEach(field => {
      const control = this.productoForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  //Mensajes
  notificacionGuardadoCorrecto(){
    this.notificacionService.showNotification("El producto se guardo correctamente");
  }

  notificacionError(message:string){
    this.notificacionService.showErrorNotification(message);
  }
  
}
