import { Component, ChangeDetectionStrategy } from '@angular/core';
import gql from 'graphql-tag';
import { ProductService } from 'src/app/product/product.service';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

const GET_PRODUCTS = gql`
  query {
    products {
      name
      description
      price
      id
      user {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-manage-products',
  template: `
    <app-add-product (productAdded)="reloadData$.next()"></app-add-product>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Sl. no</th>
          <th>Product name</th>
          <th>Product description</th>
          <th>Price</th>
          <th>Created by</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products$ | async; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.user.name }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageProductsComponent {
  products$: Observable<any>;
  reloadData$ = new Subject<void>();

  constructor(private productService: ProductService) {
    this.products$ = this.reloadData$.pipe(
      startWith(undefined),
      switchMap(() => this.productService.getProducts(GET_PRODUCTS))
    );
  }
}
