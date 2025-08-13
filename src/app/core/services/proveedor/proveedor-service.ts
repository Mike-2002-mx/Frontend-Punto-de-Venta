import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../../interfaces/proveedor';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  
  private http = inject(HttpClient);

  getProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${environment.apiUrl}/proveedores`);
  }

}
