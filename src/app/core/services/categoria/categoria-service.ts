import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);

  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${environment.apiUrl}/categorias`);
  }

}
