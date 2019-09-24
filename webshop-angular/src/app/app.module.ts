import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsEditComponent } from './pages/products-edit/products-edit.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';
import { PostfixPipe } from './pipe/postfix.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ProductsEditComponent,
    ProductsNewComponent,
    PostfixPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
