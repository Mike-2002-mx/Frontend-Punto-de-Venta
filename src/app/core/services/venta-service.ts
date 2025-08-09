import { Injectable, signal } from '@angular/core';
import { Venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  ventas= signal<Venta[]>([
    {id: 1,folio: '000001',fecha: new Date('2002-02-21'),total: 80,pagoCon: 100,cambio: 20},
    {id: 2,folio: '000002',fecha: new Date('2003-05-10'),total: 150,pagoCon: 200,cambio: 50},
    {id: 3,folio: '000003',fecha: new Date('2005-11-03'),total: 60,pagoCon: 100,cambio: 40},
    {id: 4,folio: '000004',fecha: new Date('2010-08-15'),total: 250,pagoCon: 300,cambio: 50},
    {id: 5,folio: '000005',fecha: new Date('2020-01-22'),total: 500,pagoCon: 1000,cambio: 500}
  ]);

  getVentas(): Venta[] {
    return this.ventas();
  }

  cerrarVenta(venta: Venta){
    this.ventas.update(list=> [...list, venta]);
  }




}
