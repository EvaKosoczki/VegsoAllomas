import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';
import { ProductsEditComponent } from './pages/products-edit/products-edit.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
