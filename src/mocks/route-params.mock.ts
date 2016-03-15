import {provide, Provider} from "angular2/core";
import {RouteParams} from "angular2/router";

export class MockRouteParams {
  private ROUTE_PARAMS = {};
  
  public set(key: string, value: string): void {
    this.ROUTE_PARAMS[key] = value;
  }
  
  public get(key: string): string {
    return this.ROUTE_PARAMS[key];
  }
  
  public getProvider(): Provider {
    return provide(RouteParams, {useValue: this});
  }
}