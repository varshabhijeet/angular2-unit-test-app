import {
  describe,
  expect,
  it,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';

import {MockRouterProvider} from '../../mocks/router-provider.mock';

import {UserDetailComponent} from './user-detail.component';

describe('When loading the UserDetailComponent', () => {
  var mockRouterProvider = new MockRouterProvider();
  
  beforeEachProviders(() => {
    return [mockRouterProvider.getProviders()];
  });
  
  it('should show the correct id of the user',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      mockRouterProvider.setRouteParam('userId', '30');
      return tcb.createAsync(UserDetailComponent).then((fixture: ComponentFixture) => {    
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2')).toHaveText('User Id: 30');
      });
    })
  );
});