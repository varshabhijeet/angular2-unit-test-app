import {UserAppComponent} from './components/user-app/user-app.component';
import {bootstrap} from 'angular2/bootstrap';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';

bootstrap(UserAppComponent, [
  HTTP_PROVIDERS, 
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);