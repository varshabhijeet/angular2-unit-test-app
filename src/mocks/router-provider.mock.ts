import {SpyObject} from 'angular2/testing_internal';
import {Router, Location, LocationStrategy, RouteParams} from 'angular2/router';
import {Instruction, ResolvedInstruction, ComponentInstruction} from 'angular2/src/router/instruction';
import {provide} from 'angular2/core';

class MockRouter extends SpyObject {
  public navigate: Function;
  
  constructor() {
    super(Router);
    this.navigate = this.spy('navigate');
  }
  
  public isRouteActive(instruction: Instruction): boolean {
    return true;
  }
  
  public generate(linkParams: any[]): Instruction {
    return new ResolvedInstruction(
      new ComponentInstruction('detail', [], null, null, true, '0'),
      null,
      {}
    )
  }
  
}

class MockLocationStrategy extends SpyObject {
  constructor() {
    super(LocationStrategy);
  }
}

class MockLocation extends SpyObject {
  constructor() {
    super(Location);
  }
}

class MockRouteParams extends SpyObject {
  private ROUTE_PARAMS = {};
  
  constructor() {
    super(RouteParams);
  }
  
  public set(key: string, value: string): void {
    this.ROUTE_PARAMS[key] = value;
  }
  
  public get(key: string): string {
    return this.ROUTE_PARAMS[key];
  }
}

export class MockRouterProvider {
  
  public mockRouter: MockRouter;
  public mockRouteParams: MockRouteParams;
  public mockLocation: MockLocation;
  public mockLocationStrategy: MockLocationStrategy;
  
  constructor() {
    this.mockRouter = new MockRouter();
    this.mockRouteParams = new MockRouteParams();
    this.mockLocation = new MockLocation();
    this.mockLocationStrategy = new MockLocationStrategy();
  }
  
  public setRouteParam(key: string, value: string): void {
    this.mockRouteParams.set(key, value);
  }
  
  public getProviders(): Array<any> {
    return [
      provide(Router, {useValue: this.mockRouter}),
      provide(RouteParams, {useValue: this.mockRouteParams}),
      provide(Location, {useValue: this.mockLocation}),
      provide(LocationStrategy, {useValue: this.mockLocationStrategy})
    ]
  }
}