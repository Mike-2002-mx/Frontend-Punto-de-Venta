import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${environment.apiUrl}/productos`);
  }

  buscarPorCodigo(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${environment.apiUrl}/productos/searchByCode/${codigo}`);
  }

  buscarPorPalabraClave(palabra:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${environment.apiUrl}/search/${palabra}`);
    // return this.productos().filter(p=>p.descripcion.toLowerCase().includes(palabra.toLowerCase()));
  }
}
