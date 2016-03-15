import {
  describe,
  expect,
  it,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture,
  beforeEachProviders
} from 'angular2/testing';

import {UserAppComponent} from './user-app.component';

import {
  Router, 
  RouteRegistry, 
  Location,
  ROUTER_PRIMARY_COMPONENT
} from "angular2/router";

import {provide} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';

describe('When loading the UserAppComponent', () => {
   
  beforeEachProviders(() => {  
    return [
      RouteRegistry,
      provide(Router, {useClass: RootRouter}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: UserAppComponent}),
      provide(Location, {useClass: SpyLocation})
    ];
  });
  
  it('should show 2 links', 
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(UserAppComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('li a').length).toBe(2)
        });
    })
  );
  
});