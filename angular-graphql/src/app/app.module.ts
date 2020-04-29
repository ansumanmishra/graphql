import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // CLI imports router
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { User } from './user/user.component';
import { UserSearch } from './user/user-search.component';
import { ProductList } from './product/product-list.component';
import { LoginComponent } from './admin/login/login.component';
import { AddProductComponent } from './admin/products/add-product.component';
import { ManageProductsComponent } from './admin/products/manage-products.component';

@NgModule({
  declarations: [
    AppComponent,
    User,
    UserSearch,
    ProductList,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AddProductComponent,
    ManageProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ProductList },
      { path: 'admin', component: LoginComponent },
      { path: 'admin/manage-products', component: ManageProductsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
