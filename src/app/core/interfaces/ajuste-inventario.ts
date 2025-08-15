export interface AjusteInventario {
    id:number;
    folio:string;
    motivo:string;
    fecha: Date;
    totalNegativo:number;
    totalPositivo:number;
    totalGeneral:number;
    productosVendidos:ProductoAjustado[];
}


export interface ProductoAjustado{
    descripcionProducto:string;
    existenciaAnterior:number;
    nuevaExistencia:number;
    diferencia:number;
    precioUnitario:number;
    subtotal:number;
}