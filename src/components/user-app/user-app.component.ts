import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserListComponent} from '../user-list/user-list.component';
import {CreateUserComponent} from '../create-user/create-user.component';
import {UserDetailComponent} from '../user-detail/user-detail.component';

@Component({
  selector: 'user-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h1>User App</h1>
    <ul>
      <li><a [routerLink]="['/UserList']">List Users</a></li>
      <li><a [routerLink]="['/CreateUser']">Create User</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', as: 'UserList', component: UserListComponent, useAsDefault: true },
  { path: '/create-user', as: 'CreateUser', component: CreateUserComponent },
  { path: '/user-detail/:userId', as: 'UserDetail', component: UserDetailComponent }
])
export class UserAppComponent {
  
}