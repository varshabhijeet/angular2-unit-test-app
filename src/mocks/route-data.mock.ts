import {provide, Provider} from "angular2/core";
import {RouteData} from "angular2/router";

export class MockRouteData {
    private values: any = {};

    public get(key: string): any {
        return this.values[key];
    }

    public set(key: string, value: any): void {
        this.values[key] = value;
    }

    public getProvider(): Provider {
        return provide(RouteData, {useValue: this});
    }
}
