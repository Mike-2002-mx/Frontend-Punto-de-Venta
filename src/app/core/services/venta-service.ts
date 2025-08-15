import { inject, Injectable, signal } from '@angular/core';
import { Venta } from '../interfaces/venta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VentaRequest } from '../../features/ventas/interfaces/venta-request';
import { PaginatedResponse } from '../interfaces/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private http = inject(HttpClient);

  getVentas(page:number, size:number, sort: string = "fecha,desc"):Observable<PaginatedResponse<Venta>>{
    return this.http.get<PaginatedResponse<Venta>>(`${environment.apiUrl}/ventas?page=${page}&size=${size}&sort=${sort}`);
  }

  crearVenta(venta: VentaRequest):Observable<VentaRequest>{
    return this.http.post<VentaRequest>(`${environment.apiUrl}/ventas`, venta);
  }

  buscarPorFolio(folio: string):Observable<Venta>{
    return this.http.get<Venta>(`${environment.apiUrl}/ventas/folio?folio=${folio}`);
  }

}
