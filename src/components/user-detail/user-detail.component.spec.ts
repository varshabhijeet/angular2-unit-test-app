import {
  describe,
  expect,
  it,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';

import {MockRouter} from '../../mocks/router.mock';
import {MockRouteParams} from '../../mocks/route-params.mock';

import {UserDetailComponent} from './user-detail.component';

describe('When loading the UserDetailComponent', () => {
  let mockRouter = new MockRouter();
  let mockRouteParams = new MockRouteParams();
  
  beforeEachProviders(() => {
    return [
      mockRouter.getProvider(),
      mockRouteParams.getProvider()
    ];
  });
  
  it('should show the correct id of the user',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      mockRouteParams.set('userId', '30');
      return tcb.createAsync(UserDetailComponent).then((fixture: ComponentFixture) => {    
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2')).toHaveText('User Id: 30');
      });
    })
  );
});