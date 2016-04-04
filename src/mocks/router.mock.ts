import {Instruction, ResolvedInstruction, ComponentInstruction} from "angular2/src/router/instruction";

export class MockRouter {
  
  constructor() {
    spyOn(this, 'navigate').and.callThrough();
  }
  
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
}
