import { CarritoVenta } from "../../features/ventas/interfaces/carrito-venta";

export interface Venta {
    id:number;
    folio:string;
    fecha:Date;
    total:number;
    pagoCon:number;
    cambio:number;
    productoVendidos:CarritoVenta[];
}
