import {Observable, ReplaySubject} from 'rxjs';
import {IUser} from './user.model';

export class MockUserService {
  
  public fakeResponse: any = null;
  
  constructor() {
      spyOn(this, 'getAllUsers').and.callThrough();
      spyOn(this, 'createUser').and.callThrough();
  }
  
  public getAllUsers(): Observable<IUser[]> {
    let subject = new ReplaySubject();
    subject.next(this.fakeResponse);
    return subject;
  }
  
  public createUser(user: IUser): Observable<IUser> {
    let subject = new ReplaySubject();
    subject.next(this.fakeResponse);
    return subject;
  }
  
  public setResponse(response: any): void {
    this.fakeResponse = response;
  }
}
