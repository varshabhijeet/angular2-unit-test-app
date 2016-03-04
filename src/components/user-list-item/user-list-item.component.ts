import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';

@Component({
  selector: 'user-list-item',
  styles: [':host { display: block; margin: 10px 0; border: 1px solid black; }'],
  template: `
    <span class="username">Username: {{ username }}</span><br>
    <span class="email">Email: {{ getEmail() }}</span><br>
    <button (click)="viewDetails()">View Details</button>
  `
})
export class UserListItemComponent {
  @Input() id: number;
  @Input() username: string;
  @Input() email: string;
  
  private router: Router;
  
  constructor(router: Router) {
    this.router = router;
  }
  
  public getEmail(): string {
    return this.email;
  }
  
  public viewDetails(): void {
    this.router.navigate(['/UserDetail', {userId: this.id}]);
  }
}