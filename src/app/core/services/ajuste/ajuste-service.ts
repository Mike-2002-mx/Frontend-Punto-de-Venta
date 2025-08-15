import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjusteInventario } from '../../interfaces/ajuste-inventario';
import { environment } from '../../../../environments/environment';
import { AjusteInventarioRequest } from '../../../features/inventario/interfaces/AjusteInventarioRequest';

@Injectable({
  providedIn: 'root'
})
export class AjusteService {
  
  //Injectar
  private http = inject(HttpClient);

  getAjustes(page: number, size:number):Observable<AjusteInventario>{
    return this.http.get<AjusteInventario>(`${environment.apiUrl}/ajustes-inventario?page=${page}&size=${size}`);
  }

  agregarAjuste(ajuste: AjusteInventarioRequest):Observable<AjusteInventarioRequest>{
    return this.http.post<AjusteInventarioRequest>(`${environment.apiUrl}/ajustes-inventario`, ajuste);
  }

}
