import {provide, Provider} from 'angular2/core';
import {UserService} from './user.service';
import * as Rx from 'rxjs/Rx';

export class MockUserService {
  
  public fakeResponse: any = null;
  
  public getAllUsers(): Rx.Observable<any> {
    let subject = new Rx.ReplaySubject()
    subject.next(this.fakeResponse);
    return subject;
  }
  
  public setResponse(response: any): void {
    this.fakeResponse = response;
  }
  
  public getProvider(): Provider {
    return provide(UserService, {useValue: this});
  }
}