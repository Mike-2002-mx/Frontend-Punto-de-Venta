export interface AjusteInventarioRequest {
    motivo: string;
    productos: ProductoAjustadoRequest[];
}

export interface ProductoAjustadoRequest{
    idProducto:number;
    nuevaExistencia:number;
}