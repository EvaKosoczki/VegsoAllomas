import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';
import { ProductsEditComponent } from './pages/products-edit/products-edit.component';
import { OrdersTableComponent } from './pages/orders-table/orders-table.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BasketsTableComponent } from './pages/baskets-table/baskets-table.component';
import { FirstReportComponent } from './pages/first-report/first-report.component';
import { SecondReportComponent } from './pages/second-report/second-report.component';


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
  path: 'users',
  component: UsersTableComponent
},
{
  path: 'users/edit/:id',
  component: UsersEditComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'baskets',
  component: BasketsTableComponent
},
{
  path: 'reports/orders',
  component: FirstReportComponent
},
{
  path: 'reports/products',
  component: SecondReportComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
