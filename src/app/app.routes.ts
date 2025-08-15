import { Routes } from '@angular/router';
import { BuscarProductoComponent } from './shared/buscar-producto/buscar-producto-component/buscar-producto-component';
import { CarritoCompras } from './features/ventas/components/carrito-compras/carrito-compras';
import { VentasPage } from './features/ventas/pages/ventas-page/ventas-page';
import { ComprasPage } from './features/compras/pages/compras-page/compras-page';
import { InventarioPage } from './features/inventario/pages/inventario-page/inventario-page';
import { HistorialPage } from './features/historial/pages/historial-page/historial-page';
import { AgregarProductoComponent } from './features/inventario/components/agregar-producto-component/agregar-producto-component';
import { EditarProductoComponent } from './features/inventario/components/editar-producto/editar-producto-component/editar-producto-component';
import { AjusteInventarioPage } from './features/inventario/pages/ajuste-inventario/ajuste-inventario-page/ajuste-inventario-page';

export const routes: Routes = [
    {path:"ventas-page", component:VentasPage},
    {path:"compras-page", component:ComprasPage},
    {path:"inventario-page", component:InventarioPage},
    {path:"historial-page", component:HistorialPage},
    {path:"carrito", component:CarritoCompras},
    {path:"buscar-producto", component:BuscarProductoComponent},
    {path:"agregar-producto", component:AgregarProductoComponent},
    { path: 'editar-producto/:id', component: EditarProductoComponent},
    {path:'ajuste-inventario', component:AjusteInventarioPage},
    {path:"**", redirectTo:"agregar-producto"}
];
