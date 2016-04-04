export class MockRouteData {
    private values: any = {};

    public get(key: string): any {
        return this.values[key];
    }

    public set(key: string, value: any): void {
        this.values[key] = value;
    }
}
