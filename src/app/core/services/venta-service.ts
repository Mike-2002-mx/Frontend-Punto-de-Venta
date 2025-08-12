import { inject, Injectable, signal } from '@angular/core';
import { Venta } from '../interfaces/venta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VentaRequest } from '../interfaces/venta-request';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private http = inject(HttpClient);

  // getVentas():Observable<Venta[]>{
  //   return this.http.get<Venta[]>(`${environment.apiUrl}/ventas`)
  // }

  crearVenta(venta: VentaRequest):Observable<VentaRequest>{
    return this.http.post<VentaRequest>(`${environment.apiUrl}/ventas`, venta);
  }
}
