export interface ProductoRequest {
    codigoBarras: string;
    idCategoria: number;
    idProveedor: number;
    descripcion:string;
    precioVenta: number;
    precioCompra: number;
    stockActual:number;
    stockMinimo: number;
}
