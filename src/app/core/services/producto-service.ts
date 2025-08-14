import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { ProductoRequest } from '../../features/inventario/interfaces/producto-request';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${environment.apiUrl}/productos`);
  }

  getProductoPorId(id: number):Observable<Producto>{
    return this.http.get<Producto>(`${environment.apiUrl}/productos/${id}`);
  }

  buscarPorCodigo(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${environment.apiUrl}/productos/searchByCode/${codigo}`);
  }

  buscarPorPalabraClave(palabra:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${environment.apiUrl}/search/${palabra}`);
  }

  agregarProducto(producto: ProductoRequest): Observable<ProductoRequest>{
    console.log("ProductoSevice- ", producto);
    return this.http.post<ProductoRequest>(`${environment.apiUrl}/productos`, producto);
  }

  actualizarProducto(id: number, producto: ProductoRequest): Observable<ProductoRequest>{
    console.log("ProductoSevice- ", producto);
    return this.http.put<ProductoRequest>(`${environment.apiUrl}/productos/${id}`, producto);
  }
}
