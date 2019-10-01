import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';
import { ProductsEditComponent } from './pages/products-edit/products-edit.component';
import { OrdersTableComponent } from './pages/orders-table/orders-table.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { OrdersEditComponent } from './pages/orders-edit/orders-edit.component';
import { OrdersNewComponent } from './pages/orders-new/orders-new.component';
import { UsersNewComponent } from './pages/users-new/users-new.component';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';
import { BasketsTableComponent } from './pages/baskets-table/baskets-table.component';


const routes: Routes = [{
  path: 'products',
  component: ProductsTableComponent
},
{
  path: 'products/new',
  component: ProductsNewComponent
},
{
  path: 'products/edit/:id',
  component: ProductsEditComponent
},
{
  path: 'orders',
  component: OrdersTableComponent
},
{
  path: 'orders/edit/:id',
  component: OrdersEditComponent
},
{
  path: 'orders/new',
  component: OrdersNewComponent
},
{
  path: 'users',
  component: UsersTableComponent
},
{
  path: 'users/new',
  component: UsersNewComponent
},
{
  path: 'users/edit/:id',
  component: UsersEditComponent
},
{
  path: 'baskets',
  component: BasketsTableComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
