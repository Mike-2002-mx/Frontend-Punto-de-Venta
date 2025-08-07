import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos = signal<Producto[]>([
    { id: 1, descripcion: "Lapicero Bic", cod_barras: '1000', exis: 20, stock_min: 10, precio_venta: 3.50, precio_compra: 2.50 },
    { id: 2, descripcion: "Cuaderno A4 Ledesma", cod_barras: '1001', exis: 50, stock_min: 20, precio_venta: 10.00, precio_compra: 7.00 },
    { id: 3, descripcion: "Resaltador Faber", cod_barras: '1002', exis: 15, stock_min: 10, precio_venta: 4.00, precio_compra: 2.80 },
    { id: 4, descripcion: "Corrector líquido", cod_barras: '1003', exis: 18, stock_min: 8, precio_venta: 5.50, precio_compra: 3.50 },
    { id: 5, descripcion: "Carpeta oficio", cod_barras: '1004', exis: 22, stock_min: 10, precio_venta: 6.00, precio_compra: 4.00 },
    { id: 6, descripcion: "Tijera escolar", cod_barras: '1005', exis: 12, stock_min: 5, precio_venta: 7.00, precio_compra: 5.00 },
    { id: 7, descripcion: "Pritt barra", cod_barras: '1006', exis: 30, stock_min: 10, precio_venta: 3.00, precio_compra: 2.00 },
    { id: 8, descripcion: "Regla 30cm", cod_barras: '1007', exis: 25, stock_min: 15, precio_venta: 2.50, precio_compra: 1.50 },
    { id: 9, descripcion: "Marcador permanente", cod_barras: '1008', exis: 18, stock_min: 10, precio_venta: 4.50, precio_compra: 3.00 },
    { id: 10, descripcion: "Cartuchera escolar", cod_barras: '1009', exis: 10, stock_min: 5, precio_venta: 12.00, precio_compra: 8.00 },
    { id: 11, descripcion: "Lapiz HB", cod_barras: '1010', exis: 35, stock_min: 20, precio_venta: 1.00, precio_compra: 0.60 },
    { id: 12, descripcion: "Goma de borrar", cod_barras: '1011', exis: 40, stock_min: 20, precio_venta: 1.50, precio_compra: 0.80 },
    { id: 13, descripcion: "Compás escolar", cod_barras: '1012', exis: 8, stock_min: 3, precio_venta: 6.50, precio_compra: 4.00 },
    { id: 14, descripcion: "Caja de lápices de colores", cod_barras: '1013', exis: 16, stock_min: 10, precio_venta: 8.00, precio_compra: 5.50 },
    { id: 15, descripcion: "Sacapuntas doble", cod_barras: '1014', exis: 20, stock_min: 10, precio_venta: 2.20, precio_compra: 1.30 },
    { id: 16, descripcion: "Pegamento líquido", cod_barras: '1015', exis: 13, stock_min: 5, precio_venta: 3.70, precio_compra: 2.40 },
    { id: 17, descripcion: "Cuaderno espiral", cod_barras: '1016', exis: 27, stock_min: 12, precio_venta: 9.00, precio_compra: 6.00 },
    { id: 18, descripcion: "Papel glasé", cod_barras: '1017', exis: 35, stock_min: 20, precio_venta: 2.80, precio_compra: 1.50 },
    { id: 19, descripcion: "Block de hojas", cod_barras: '1018', exis: 22, stock_min: 10, precio_venta: 7.00, precio_compra: 4.50 },
    { id: 20, descripcion: "Marcador fluorescente", cod_barras: '1019', exis: 30, stock_min: 15, precio_venta: 3.60, precio_compra: 2.20 },
    { id: 21, descripcion: "Bolígrafo azul", cod_barras: '1020', exis: 45, stock_min: 20, precio_venta: 1.20, precio_compra: 0.80 },
    { id: 22, descripcion: "Fichero escolar", cod_barras: '1021', exis: 10, stock_min: 5, precio_venta: 11.00, precio_compra: 7.50 },
    { id: 23, descripcion: "Set de geometría", cod_barras: '1022', exis: 12, stock_min: 5, precio_venta: 13.00, precio_compra: 9.00 },
    { id: 24, descripcion: "Etiquetas autoadhesivas", cod_barras: '1023', exis: 28, stock_min: 15, precio_venta: 2.00, precio_compra: 1.00 },
    { id: 25, descripcion: "Papel fotográfico", cod_barras: '1024', exis: 9, stock_min: 4, precio_venta: 6.00, precio_compra: 3.50 },
    { id: 26, descripcion: "Notas adhesivas", cod_barras: '1025', exis: 32, stock_min: 20, precio_venta: 2.30, precio_compra: 1.20 },
    { id: 27, descripcion: "Anotador chico", cod_barras: '1026', exis: 18, stock_min: 8, precio_venta: 3.90, precio_compra: 2.10 },
    { id: 28, descripcion: "Separadores plásticos", cod_barras: '1027', exis: 14, stock_min: 6, precio_venta: 4.20, precio_compra: 2.60 },
    { id: 29, descripcion: "Clip metálico", cod_barras: '1028', exis: 50, stock_min: 25, precio_venta: 1.00, precio_compra: 0.50 },
    { id: 30, descripcion: "Cinta adhesiva", cod_barras: '1029', exis: 26, stock_min: 10, precio_venta: 3.20, precio_compra: 2.00 }
  ]);

}
