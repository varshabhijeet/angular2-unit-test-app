import {Observable, ReplaySubject} from 'rxjs';
import {IUser} from '../components/user-utils/user.model';

export class MockHttp {
    
    private fakeResponse: any = null;
    
    constructor() {
        spyOn(this, 'get').and.callThrough();
        spyOn(this, 'post').and.callThrough();
    }
    
    public get(url: string): Observable<any> {
        let subject = new ReplaySubject();
        subject.next(this.fakeResponse);
        return subject;
    }
    
    public post(url: string, user: IUser): Observable<any> {
        let subject = new ReplaySubject();
        subject.next(this.fakeResponse);
        return subject;
    }
    
    public setResponse(response: any): void {
        this.fakeResponse = response;
    }
}