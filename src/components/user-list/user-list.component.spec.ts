import {
  describe, 
  expect, 
  it,
  injectAsync,
  inject,
  fakeAsync,
  TestComponentBuilder,
  ComponentFixture,
  beforeEachProviders,
  tick
} from 'angular2/testing';

import {SpyObject} from 'angular2/testing_internal';
import {Http, ConnectionBackend, BaseRequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

import {provide, bind, Component, Input, Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';

import {MockUserService, SpyUserService} from '../user-utils/user.service.mock';
import {UserListComponent} from './user-list.component';
import {UserService} from '../user-utils/user.service';
import {IUser} from '../user-utils/user.model';
import {UserListItemComponent} from '../user-list-item/user-list-item.component';

@Component({
  selector: 'user-list-item',
  template: `
    <span class="username">Username: {{ username }}</span><br>
    <span class="email">Email: {{ email }}</span><br>
  `
})
class MockUserListItemComponent {
  @Input() username: string;
  @Input() email: string;
}

describe('When starting the user app component', () => {
  
  it('should show 2 users', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    
    let mockUserService = new MockUserService();
    mockUserService.setResponse([{
      name: 'John',
      username: 'thejohn',
      email: 'pepe@gmail.com'
    }]);
    
    return tcb
      .overrideDirective(UserListComponent, UserListItemComponent, MockUserListItemComponent) //this needs to be called before overrideProviders
      .overrideProviders(UserListComponent, [provide(UserService, {useValue: mockUserService})])
      .createAsync(UserListComponent)
      .then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('user-list-item span.email')).toHaveText('Email: pepe@gmail.com');
      });
  }));
  
  it('should call the spy method', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    
    let spyUserService = new SpyUserService();
    spyUserService.setResponse([{
      name: 'John',
      username: 'thejohn',
      email: 'pepe@gmail.com'
    }]);
    
    return tcb
      .overrideDirective(UserListComponent, UserListItemComponent, MockUserListItemComponent) //this needs to be called before overrideProviders
      .overrideProviders(UserListComponent, [provide(UserService, {useValue: spyUserService})])
      .createAsync(UserListComponent)
      .then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        expect(spyUserService.getAllUsers).toHaveBeenCalled();
      });
  }));
  
});
