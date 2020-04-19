import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {}
  getProducts(query) {
    return this.apollo.watchQuery({ query }).valueChanges.pipe(
      map((result: any) => result.data && result.data.products),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
