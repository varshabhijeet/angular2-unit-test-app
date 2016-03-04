import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
  selector: 'user-detail',
  template: `
    <h2>User Id: {{ id }}</h2>
    <button (click)="goToList()">Go Back</button>
  `
})
export class UserDetailComponent {
  
  private router: Router;
  public id: number;
  
  constructor(router: Router, params: RouteParams) {
    this.router = router;
    this.id = parseInt(params.get('userId'), 10);
  }
  
  public goToList(): void {
    this.router.navigate(['/UserList']);
  }
}