import {SpyObject} from 'angular2/testing_internal';
import {UserService} from './user.service';

export class MockUserService {
  public fakeResponse: any = null;
  
  public getAllUsers() {
    return this;
  }
  
  public subscribe(callback) {
    callback(this.fakeResponse);
  }
  
  public setResponse(response: any): void {
    this.fakeResponse = response;
  }
}

export class SpyUserService extends SpyObject {
  public getAllUsers: Function;
  public fakeResponse: any = null;
  
  constructor() {
    super(UserService);
    this.getAllUsers = this.spy('getAllUsers').andReturn(this);
  }
  
  public subscribe(callback) {
    callback(this.fakeResponse);
  }
  
  public setResponse(data: any): void {
    this.fakeResponse = data;
  }
}