export class MockRouteParams {
  private ROUTE_PARAMS = {};
  
  public set(key: string, value: string): void {
    this.ROUTE_PARAMS[key] = value;
  }
  
  public get(key: string): string {
    return this.ROUTE_PARAMS[key];
  }
}