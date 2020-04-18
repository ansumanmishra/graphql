import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import gql from 'graphql-tag';
import { UserService } from './user.service';

@Component({
  selector: 'app-search-user',
  template: `
    <input
      type="text"
      name="search"
      #keyword
      (keyup)="keyword$.next(keyword.value)"
    />
  `
})
export class UserSearch implements OnDestroy {
  private subscription$ = new Subject();
  keyword$: Subject<string> = new Subject();
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();

  constructor(private userService: UserService) {
    this.keyword$
      .pipe(takeUntil(this.subscription$), debounceTime(500))
      .subscribe(keyword => this.keywordChange.emit(keyword));
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
