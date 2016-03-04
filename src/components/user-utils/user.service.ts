import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {IUser} from './user.model';

@Injectable()
export class UserService {
  private http: Http;
  private baseUrl: string = 'http://jsonplaceholder.typicode.com/users';
  
  constructor(http: Http) {
    this.http = http;
  }
  
  public getAllUsers(): Observable<IUser[]> {
    return this.http.get(this.baseUrl)
      .map(res => res.json());
  }
  
  public createUser(user: IUser): Observable<IUser> {
    return this.http.post(this.baseUrl, JSON.stringify(user))
      .map(res => res.json());
  }
}
