import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { User } from './user/user.component';
import { UserSearch } from './user/user-search.component';

@NgModule({
  declarations: [AppComponent, User, UserSearch],
  imports: [BrowserModule, GraphQLModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
