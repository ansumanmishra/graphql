import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';

import { ProductService } from './product.service';
import { switchMap, startWith, map, tap } from 'rxjs/operators';

const GET_PRODUCTS = gql`
  {
    products {
      id
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
      <!-- <div
        class="col-sm text-center"
        *ngIf="products$ && (products$ | async)?.length < 1"
      >
        Oops! No product(s) found!
      </div>-->
      <div class="col-sm text-center" *ngIf="!(products$ | async)">
        loading products...
      </div>
      <div
        class="col-sm col-md-4 mb-4"
        *ngFor="let product of products$ | async"
      >
        <div class="card">
          <img
            class="card-img-top"
            [src]="
              product.image
                ? 'http://localhost:3000/images/' + product.image
                : 'assets/image-not-found.png'
            "
            alt="Product"
            style="width:345px; height: 230px;"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ product.name }} <br />
              {{ product.price | currency: 'CHF' }}
            </h5>
            <p class="card-text">
              {{ product.description }}
            </p>
            <a href="#" class="btn btn-primary">View Details</a> &nbsp;
            <a
              href="javascript:void(0)"
              class="btn btn-primary"
              (click)="addCart(product.id)"
              >Add to Cart</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList implements OnInit {
  products$: Observable<any> = null;

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.products$ = this.productService.productKeyword$.pipe(
      startWith(null),
      switchMap(keyword => {
        if (keyword) {
          return this.products$.pipe(
            map(products => {
              return products.filter(
                product =>
                  product.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
              );
            })
          );
        }
        return this.productService.getProducts(GET_PRODUCTS);
      })
    );
  }

  addCart(productId: string) {
    this.productService.addToCart(productId);

    // const cartProducts = localStorage.getItem('products');
    // if (cartProducts) {
    //   const a = JSON.parse(cartProducts);
    //   console.log(a);
    //   a.push(productId);
    //   localStorage.setItem('products', a);
    // } else {
    //   localStorage.setItem('products', JSON.stringify([productId]));
    // }
    // console.log(JSON.parse(localStorage.getItem('products')));
  }
}
