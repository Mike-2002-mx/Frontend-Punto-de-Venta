export interface VentaRequest {
  total: number;
  pagoCon: number;
  productos: DetallesVentaRequest[];
}

export interface DetallesVentaRequest {
  idProducto: number; 
  cantidad: number;
}