import {Component, OnInit} from 'angular2/core';
import {UserListItemComponent} from '../user-list-item/user-list-item.component';
import {UserService} from '../user-utils/user.service';
import {IUser} from '../user-utils/user.model';

@Component({
  selector: 'user-list',
  providers: [UserService],
  directives: [UserListItemComponent],
  template: `
    <user-list-item *ngFor="#user of users" [id]="user.id" [username]="user.username" [email]="user.email"></user-list-item>
  `
})
export class UserListComponent implements OnInit {
  public users: IUser[] = [];
  private userService: UserService;
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe((users: IUser[]) => {
        this.users = users;
      });
  }
  
}