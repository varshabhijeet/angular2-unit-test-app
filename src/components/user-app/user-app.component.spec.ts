import {
  describe,
  expect,
  it,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture,
  beforeEachProviders
} from 'angular2/testing';

import {MockRouterProvider} from '../../mocks/router-provider.mock';

import {UserAppComponent} from './user-app.component';

describe('When loading the UserAppComponent', () => {
  
  var mockRouterProvider: MockRouterProvider = new MockRouterProvider();
  
  beforeEachProviders(() => {
    return [mockRouterProvider.getProviders()];
  });
  
  it('should do something', 
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(UserAppComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let compiled = fixture.debugElement.nativeElement;
        });
    })
  );
  
});