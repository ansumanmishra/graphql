import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'apollo-link';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" routerLink="/">EKart</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" routerLink="/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/admin">Login</a>
          </li>
        </ul>
        <a class="nav-link">{{ (cartItems$ | async)?.length }}</a>

        <form
          class="form-inline my-2 my-lg-0"
          (ngSubmit)="productService.setKeyword(keyword.value)"
        >
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            #keyword
          />
          <button class="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  cartItems$ = this.productService.cart$;
  constructor(private productService: ProductService) {}
}
