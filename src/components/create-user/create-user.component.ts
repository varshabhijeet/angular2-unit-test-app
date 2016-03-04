import {Component} from 'angular2/core';
import {FormBuilder, AbstractControl, ControlGroup, Validators} from 'angular2/common';
import {Router} from 'angular2/router';

import {UserService} from '../user-utils/user.service';
import {IUser} from '../user-utils/user.model';

@Component({
  selector: 'create-user',
  providers: [UserService],
  template: `
    <form [ngFormModel]="" (ngSubmit)="onSubmit()" novalidate>
      <div class="username">
        <label for="username">Username:</label>
        <input type="text" id="username" [ngFormControl]="username">
        <ul *ngIf="!username.valid && username.dirty" class="errors">
          <li *ngIf="username.hasError('required')">
            The username is required
          </li>
          <li *ngIf="username.hasError('minlength')">
            The username requires at least 4 characters
          </li>
        </ul>
      </div>
      <div class="email">
        <label for="email">Email:</label>
        <input type="email" id="email" [ngFormControl]="email">
        <ul *ngIf="!email.valid && email.dirty" class="errors">
          <li *ngIf="email.hasError('required')">
            The email is required
          </li>
        </ul>
      </div>
      <div *ngIf="group.valid" class="submit-data">Value to submit: {{ data }}</div>
      <button type="submit" [disabled]="!group.valid">Submit</button>
    </form>
  `
})
export class CreateUserComponent {
  
  public username: AbstractControl;
  public email: AbstractControl;
  public group: ControlGroup;
  public data: string;
  
  private service: UserService;
  private router: Router;
  
  constructor(builder: FormBuilder, service: UserService, router: Router) {
    this.service = service;
    this.router = router;
    
    this.group = builder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.required]
    });
    
    this.username = this.group.controls['username'];
    this.email = this.group.controls['email'];
    
    this.group.valueChanges.subscribe((form: any) => {
      this.data = `${form.username}, ${form.email}`;
    });
  }
  
  onSubmit() {
    this.service.createUser(this.group.value).subscribe((user: IUser) => {
      this.router.navigate(['/UserList']);
    });
  }
}
