import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {}
  getProducts(query) {
    return this.apollo
      .watchQuery({ query, fetchPolicy: 'network-only' })
      .valueChanges.pipe(
        map((result: any) => result.data && result.data.products),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addProduct(mutation, data, id = null) {
    const variables = id ? { data, id } : { data };

    return this.apollo
      .mutate({
        mutation,
        variables,
        context: {
          useMultipart: true
        }
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  deleteProduct(mutation, id) {
    return this.apollo
      .mutate({
        mutation,
        variables: { data: { id } }
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
