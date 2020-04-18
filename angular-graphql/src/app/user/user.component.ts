import { Component, OnInit } from "@angular/core";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const GET_USERS = gql`
  {
    users {
      name
      age
      id
    }
  }
`;

@Component({
  selector: "app-user",
  template: `
    <ul>
      <li *ngFor="let user of users | async">{{ user.name }}</li>
    </ul>
  `,
  styles: [``]
})
export class User implements OnInit {
  users: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.users = this.apollo
      .watchQuery({
        query: GET_USERS
      })
      .valueChanges.pipe(
        map((result: any) => result.data && result.data.users)
      );
  }
}
