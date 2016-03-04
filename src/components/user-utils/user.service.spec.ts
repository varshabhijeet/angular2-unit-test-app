import {
  describe, 
  expect, 
  it,
  inject,
  fakeAsync,
  tick,
  beforeEachProviders
} from 'angular2/testing';

import {provide} from 'angular2/core';

import {UserService} from './user.service';
import {IUser} from './user.model';

import {MockBackend, MockConnection} from 'angular2/http/testing';
import {ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod} from 'angular2/http';

describe('When testing the user service', () => {
  
  beforeEachProviders(() => {
    return [
      UserService,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      }, deps: [MockBackend, BaseRequestOptions]}) 
    ];
  });
  
  describe('and when trying to get all the user', () => {
    
    it('should try to make a GET request to the proper URL', 
      inject([UserService, MockBackend], fakeAsync((service: UserService, backend: MockBackend) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users');
          expect(connection.request.method).toBe(RequestMethod.Get);
          
          let mockResponseBody: IUser = {
            username: 'barretodavid',
            email: 'barretollano@gmail.com'
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          connection.mockRespond(new Response(response));
        });
        service.getAllUsers();
        // tick();
      }))
    );  
    
  });
  
  describe('and when trying to create a new user', () => {
    
    it('should try to make a POST request to the proper URL',
      inject([UserService, MockBackend], fakeAsync((service: UserService, backend: MockBackend) => {
        
        let mockUser: IUser = {
          username: 'barretodavid',
          email: 'barretollano@gmail.com'
        };
        
        backend.connections.subscribe((connection: MockConnection) => {
          
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users');
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.text()).toBe(JSON.stringify(mockUser));
          
          let mockResponseBody: IUser = { id: 11 };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          connection.mockRespond(new Response(response));
        });
        
        service.createUser(mockUser);
        // tick();
      }))
    );
    
  });  
  
});

