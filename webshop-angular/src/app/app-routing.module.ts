import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';


const routes: Routes = [{
  path: 'products',
  component: ProductsTableComponent
},
{
  path: 'products/new',
  component: ProductsNewComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
