import { Routes } from '@angular/router';
import { BuscarProductoComponent } from './shared/buscar-producto/buscar-producto-component/buscar-producto-component';
import { CarritoCompras } from './features/ventas/components/carrito-compras/carrito-compras';

export const routes: Routes = [
    {path:"", component:CarritoCompras},
    {path:"buscar-producto", component:BuscarProductoComponent},
    {path:"**", redirectTo:""}
];
