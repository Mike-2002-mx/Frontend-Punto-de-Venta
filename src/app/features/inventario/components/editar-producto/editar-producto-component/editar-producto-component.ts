import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../../core/services/producto-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../../core/services/categoria/categoria-service';
import { ProveedorService } from '../../../../../core/services/proveedor/proveedor-service';
import { Categoria } from '../../../../../core/interfaces/categoria';
import { Proveedor } from '../../../../../core/interfaces/proveedor';
import { ProductoRequest } from '../../../interfaces/producto-request';

@Component({
  selector: 'app-editar-producto-component',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto-component.html',
  styleUrl: './editar-producto-component.css'
})
export class EditarProductoComponent implements OnInit {
  route = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  fb = inject(FormBuilder);
  categoriaService = inject(CategoriaService);
  proveedorService = inject(ProveedorService);

  producto: Producto | null = null;
  productoForm: FormGroup;
  loading = false;
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  constructor() {
    // Inicializar el formulario vacío
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
    const id = this.route.snapshot.paramMap.get('id');

    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data
    );
    this.proveedorService.getProveedores().subscribe(
      data => this.proveedores = data
    );

    if (id) {
      this.loading = true;
      this.productoService.getProductoPorId(+id).subscribe({
        next: (producto) => {
          this.producto = producto;
          this.initializeFormWithProductData(producto);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando producto', err);
          this.loading = false;
        }
      });
    }
  }

  private initializeFormWithProductData(producto: Producto): void {
    this.productoForm.patchValue({
      codigoBarras: producto.codigoBarras,
      idCategoria: producto.idCategoria,
      idProveedor: producto.idProveedor,
      descripcion: producto.descripcion,
      precioVenta: producto.precioVenta,
      precioCompra: producto.precioCompra,
      stockActual: producto.stockActual,
      stockMinimo: producto.stockMinimo
    });

    // Si necesitas cargar categorías y proveedores
    this.loadCategoriesAndSuppliers();
  }

  private loadCategoriesAndSuppliers(): void {
    // Ejemplo de cómo cargar categorías y proveedores
    // this.productoService.getCategorias().subscribe(categorias => this.categorias = categorias);
    // this.productoService.getProveedores().subscribe(proveedores => this.proveedores = proveedores);
  }

  onSubmit(): void {
    if (this.productoForm.valid && this.producto) {
      this.loading = true;
      
      const datosProducto: Producto = {
        ...this.producto,
        ...this.productoForm.value
      };

      const updatedProducto:ProductoRequest={
          codigoBarras: datosProducto.codigoBarras,
          idCategoria: datosProducto.idCategoria,
          idProveedor: datosProducto.idProveedor,
          descripcion:datosProducto.descripcion,
          precioVenta: datosProducto.precioVenta,
          precioCompra: datosProducto.precioCompra,
          stockActual:datosProducto.stockActual,
          stockMinimo: datosProducto.stockMinimo
      }

      console.log(this.productoForm.value);
      console.log("Producto Request: ",updatedProducto);
      console.log(this.producto.id);
      this.productoService.actualizarProducto(this.producto.id, updatedProducto).subscribe({
        next: (response) => {
          console.log('Producto actualizado', response);
          this.productoForm.reset();
          alert("Producto Actualizado correctamente");
          this.loading = false;
        },
        error: (err) => {
          console.error('Error actualizando producto', err);
          this.loading = false;
        }
      });
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.productoForm.controls).forEach(field => {
      const control = this.productoForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}

