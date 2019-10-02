import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductsEditComponent } from './pages/products-edit/products-edit.component';
import { ProductsNewComponent } from './pages/products-new/products-new.component';
import { PostfixPipe } from './pipe/postfix.pipe';
import { OrdersTableComponent } from './pages/orders-table/orders-table.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { OrdersNewComponent } from './pages/orders-new/orders-new.component';
import { OrdersEditComponent } from './pages/orders-edit/orders-edit.component';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';
import { UsersNewComponent } from './pages/users-new/users-new.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BasketsTableComponent } from './pages/baskets-table/baskets-table.component';
import { DeletedPipe } from './pipe/deleted.pipe';
import { FirstReportComponent } from './pages/first-report/first-report.component';
import { SecondReportComponent } from './pages/second-report/second-report.component';
import { SumPipe } from './pipe/sum.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { CustomDatePipe } from './pipe/custom-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipePipe } from './pipe/date-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ProductsEditComponent,
    ProductsNewComponent,
    PostfixPipe,
    OrdersTableComponent,
    UsersTableComponent,
    OrdersNewComponent,
    OrdersEditComponent,
    UsersEditComponent,
    UsersNewComponent,
    DashboardComponent,
    BasketsTableComponent,
    DeletedPipe,
    FirstReportComponent,
    SecondReportComponent,
    SumPipe,
    FilterPipe,
    SortPipe,
    CustomDatePipe,
    FileSelectDirective,
    DatePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
