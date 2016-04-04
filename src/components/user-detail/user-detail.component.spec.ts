import {
  describe,
  expect,
  it,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';

import {UserDetailComponent} from './user-detail.component';

import {Router} from 'angular2/router';
import {RouteParams} from 'angular2/router';

import {MockRouter} from '../../mocks/router.mock';
import {MockRouteParams} from '../../mocks/route-params.mock';
import {provide} from 'angular2/core';

describe('When loading the UserDetailComponent', () => {
  
  beforeEachProviders(() => {
    return [
      provide(Router, {useClass: MockRouter}),
      provide(RouteParams, {useClass: MockRouteParams})
    ];
  });
  
  it('should show the correct id of the user',
    injectAsync(
      [TestComponentBuilder, RouteParams], 
      (tcb: TestComponentBuilder, mockRouteParams: MockRouteParams) => {
        mockRouteParams.set('userId', '30');
        return tcb.createAsync(UserDetailComponent).then((fixture: ComponentFixture) => {    
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h2')).toHaveText('User Id: 30');
        });
    })
  );
});