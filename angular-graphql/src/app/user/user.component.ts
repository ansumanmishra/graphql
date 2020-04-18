import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: `
    <app-search-user
      (keywordChange)="handleKeywordChange($event)"
    ></app-search-user>
    <table class="table">
      <thead>
        <tr>
          <td>Sl. No.</td>
          <td>Name</td>
          <td>Age</td>
          <td>Address</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users | async; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.address?.city }}, {{ user.address?.country }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [``]
})
export class User implements OnInit {
  users: Observable<any>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(keyword = '') {
    const GET_USERS = gql`
      {
        users(name: "${keyword}") {
          name
          age
          id
          address {
            city
            country
          }
        }
      }
    `;
    this.users = this.userService.getUsers(GET_USERS);
  }

  handleKeywordChange(keyword: string) {
    this.getUsers(keyword);
  }
}
