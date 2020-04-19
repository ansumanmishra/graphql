import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { ProductService } from './product.service';

const GET_PRODUCTS = gql`
  {
    products {
      name
      user {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-product-list',
  template: `
    <div *ngFor="let product of products$ | async">
      <div>{{ product.name }}</div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList implements OnInit {
  products$: Observable<any>;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.products$ = this.productService.getProducts(GET_PRODUCTS);
  }
}
