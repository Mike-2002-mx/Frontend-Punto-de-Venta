import { CarritoVenta } from "./carrito-venta";

export interface Venta {
    id:number;
    folio:string;
    fecha:Date;
    total:number;
    pagoCon:number;
    cambio:number;
    // productoVendidos:CarritoVenta[];
}
