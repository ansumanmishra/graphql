import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { ProductService } from './product.service';

const GET_PRODUCTS = gql`
  {
    products {
      name
      price
      description
      image
      user {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-product-list',
  template: `
    <div class="row">
      <div class="col-sm mb-4" *ngFor="let product of products$ | async">
        <div class="card" style="width: 18rem;">
          <img
            class="card-img-top"
            [src]="
              product.image
                ? 'http://localhost:3000/images/' + product.image
                : 'assets/image-not-found.png'
            "
            alt="Product"
            style="width:286px;height:190px;"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ product.name }} <br />
              {{ product.price | currency: 'CHF' }}
            </h5>
            <p class="card-text">
              {{ product.description }}
            </p>
            <a href="#" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
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
