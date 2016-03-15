import {Instruction, ResolvedInstruction, ComponentInstruction} from "angular2/src/router/instruction";
import {provide, Provider} from "angular2/core";
import {Router} from "angular2/router";

export class MockRouter {
  
  public navigate(linkParams: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(null); 
    });
  }
  
  public subscribe(callback): void {
    callback();
  }

  public isRouteActive(instruction: Instruction): boolean {
    return true;
  }

  public generate(linkParams: any[]): Instruction {
    return new ResolvedInstruction(new ComponentInstruction(), null, {});
  }

  public getProvider(): Provider {
    return provide(Router, {useValue: this});
  }
}
