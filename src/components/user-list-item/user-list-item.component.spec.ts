import {
  describe, 
  expect, 
  it,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';

import {MockRouter} from '../../mocks/router.mock';
import {UserListItemComponent} from './user-list-item.component';

describe('When loading the UserListItem component', () => {
  
  let mockRouter = new MockRouter();
  
  beforeEachProviders(() => {
    return [
      mockRouter.getProvider()
    ];
  });
  
  it('should render the id, username and email of the user', 
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(UserListItemComponent).then((fixture: ComponentFixture) => {
        fixture.componentInstance.id = '50';
        fixture.componentInstance.username = 'barretodavid';
        fixture.componentInstance.email = 'barretollano@gmail.com';
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('span.username')).toHaveText('Username: barretodavid');
        expect(compiled.querySelector('span.email')).toHaveText('Email: barretollano@gmail.com');
      });
    })
  );
  
  it('should try to navigate to /UserDetail route when clicking a the button', 
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      spyOn(mockRouter, 'navigate');
      return tcb.createAsync(UserListItemComponent).then((fixture: ComponentFixture) => {
        fixture.componentInstance.id = 15;
        fixture.componentInstance.viewDetails();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/UserDetail', {userId: 15}]);
      });
    })
  );

});