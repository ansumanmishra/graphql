import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apollo: Apollo) {}

    getUsers(query) {
        return this.apollo.watchQuery({ query }).valueChanges.pipe(
            map((result: any) => result.data && result.data.users),
            catchError(err => {
                // console.log('Handling error locally and rethrowing it...', err);
                return throwError(err);
            })
        );
    }
}
