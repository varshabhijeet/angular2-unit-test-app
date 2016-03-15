import {provide, Provider} from 'angular2/core';
import {UserService} from './user.service';
import * as Rx from 'rxjs/Rx';

export class MockUserService {
  
  public fakeResponse: any = null;
  
  public getAllUsers(): Rx.Observable<any> {
    let subject = new Rx.ReplaySubject()
    subject.next(null);
    return subject;
  }
  
  public subscribe(callback) {
    callback(this.fakeResponse);
  }
  
  public setResponse(response: any): void {
    this.fakeResponse = response;
  }
  
  public getProvider(): Provider {
    return provide(UserService, {useValue: this});
  }
}