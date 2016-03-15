import {provide, Provider} from "angular2/core";
import {Location} from "angular2/router";

export class MockLocation {

    public prepareExternalUrl(url: string): string {
        return "";
    };

    public getProvider(): Provider {
        return provide(Location, {useValue: this});
    }
}
