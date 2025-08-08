import { Routes } from '@angular/router';
import { BuscarProductoComponent } from './shared/buscar-producto/buscar-producto-component/buscar-producto-component';
import { CarritoCompras } from './features/ventas/components/carrito-compras/carrito-compras';
import { VentasPage } from './features/ventas/pages/ventas-page/ventas-page';
import { ComprasPage } from './features/compras/pages/compras-page/compras-page';
import { InventarioPage } from './features/inventario/pages/inventario-page/inventario-page';
import { HistorialPage } from './features/historial/pages/historial-page/historial-page';

export const routes: Routes = [
    {path:"ventas-page", component:VentasPage},
    {path:"compras-page", component:ComprasPage},
    {path:"inventario-page", component:InventarioPage},
    {path:"historial-page", component:HistorialPage},
    {path:"carrito", component:CarritoCompras},
    {path:"buscar-producto", component:BuscarProductoComponent},
    {path:"**", redirectTo:""}
];
