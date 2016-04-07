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

import {Component, Input} from 'angular2/core';
import {UserService} from '../user-utils/user.service';
import {MockUserService} from '../user-utils/user.service.mock';
import {UserListItemComponent} from '../user-list-item/user-list-item.component';
import {provide} from 'angular2/core';

import {UserListComponent} from './user-list.component';

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
  
  it('should show 2 users', 
    inject([TestComponentBuilder], fakeAsync((tcb: TestComponentBuilder) => {
    
      let mockUserService = new MockUserService();
      mockUserService.setResponse([{
        name: 'John',
        username: 'thejohn',
        email: 'pepe@gmail.com'
      }]);
      
      tcb
        .overrideDirective(UserListComponent, UserListItemComponent, MockUserListItemComponent)
        .overrideProviders(UserListComponent, [provide(UserService, {useValue: mockUserService})])
        .createAsync(UserListComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          tick();
          let compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('user-list-item span.email')).toHaveText('Email: pepe@gmail.com');
        });
    }))
  );
  
  it('should call the spy method', 
    inject([TestComponentBuilder], fakeAsync((tcb: TestComponentBuilder) => {

      let mockUserService = new MockUserService();
      
      tcb
        .overrideDirective(UserListComponent, UserListItemComponent, MockUserListItemComponent)
        .overrideProviders(UserListComponent, [provide(UserService, {useValue: mockUserService})])
        .createAsync(UserListComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          tick();
          expect(mockUserService.getAllUsers).toHaveBeenCalled();
        });
    }))
  );
  
});
