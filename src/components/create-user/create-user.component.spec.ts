import {
  describe, 
  expect, 
  it,
  injectAsync,
  fakeAsync,
  tick,
  inject,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture
} from 'angular2/testing';

import { dispatchEvent } from 'angular2/src/testing/utils';
import { By } from 'angular2/platform/browser';
import {FormBuilder} from 'angular2/common';

import {MockUserService} from '../user-utils/user.service.mock';
import {MockRouter} from '../../mocks/router.mock';

import {CreateUserComponent} from './create-user.component';

describe('When testing the CreateUserComponent', () => {
  
  let element: HTMLElement;
  let form: HTMLFormElement;
  let usernameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  
  let mockRouter: MockRouter;
  
  beforeEachProviders(() => {
    mockRouter = new MockRouter();
    return [FormBuilder, mockRouter.getProvider()];
  });
  
  function createComponent(tcb: TestComponentBuilder): Promise<ComponentFixture> {
    let mockUserService = new MockUserService();
    return tcb
      .overrideProviders(CreateUserComponent, [mockUserService.getProvider()])
      .createAsync(CreateUserComponent)
      .then((fixture: ComponentFixture) => {
        element = fixture.debugElement.nativeElement;
        form = fixture.debugElement.query(By.css('form')).nativeElement;
        usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
        emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
        fixture.detectChanges();
        return fixture;
      });
  }
  
  describe('When leaving the username field blank', () => {
    
    it('should show the "required" error message in the template', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb).then((fixture: ComponentFixture) => {
          usernameInput.value = '';
          dispatchEvent(usernameInput, 'input');
          fixture.detectChanges();
          let errors = element.querySelectorAll('.username .errors li');
          let errorMessage: string = errors[0].textContent.trim();
          expect(errors.length).toBe(1);
          expect(errorMessage).toBe('The username is required');
        });
      })
    );
    
  });
  
  describe('When entering a username with less than 4 characters', () => {
    
    it('should show the "min length" error message in the template', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb).then((fixture: ComponentFixture) => {
          usernameInput.value = 'bar';
          dispatchEvent(usernameInput, 'input');
          fixture.detectChanges();
          let errors = element.querySelectorAll('.username .errors li');
          let errorMessage: string = errors[0].textContent.trim();
          expect(errors.length).toBe(1);
          expect(errorMessage).toBe('The username requires at least 4 characters');
        });
      })
    );
    
  });
  
  describe('When entering a username with more than 4 characters', () => {
    
    it('should not show any error message', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb).then((fixture: ComponentFixture) => {
          usernameInput.value = 'barretodavid';
          dispatchEvent(usernameInput, 'input');
          fixture.detectChanges();
          let errors = element.querySelectorAll('.username .errors li');
          expect(errors.length).toBe(0);
        });
      })
    );
    
  });
  
  describe('When leaving the email field blank', () => {
    
    it('should show the "required" error message in the template', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb).then((fixture: ComponentFixture) => {
          emailInput.value = '';
          dispatchEvent(emailInput, 'input');
          fixture.detectChanges();
          let errors = element.querySelectorAll('.email .errors li');
          let errorMessage: string = errors[0].textContent.trim();
          expect(errors.length).toBe(1);
          expect(errorMessage).toBe('The email is required');
        });
      })
    );
    
  });
  
  describe('When entering an email', () => {
    
    it('should not show any error message', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb).then((fixture: ComponentFixture) => {
          emailInput.value = 'barretollano@gmail.com';
          dispatchEvent(emailInput, 'input');
          fixture.detectChanges();
          let errors = element.querySelectorAll('.email .errors li');
          expect(errors.length).toBe(0);
        });
      })
    );
    
  });
  
  describe('when entering a valid username and email', () => {
    
    it('should show the value to be submitted', 
      inject([TestComponentBuilder], fakeAsync((tcb: TestComponentBuilder) => {
        createComponent(tcb).then((fixture: ComponentFixture) => {
          usernameInput.value = 'barretodavid';
          emailInput.value = 'barretollano@gmail.com';
          dispatchEvent(usernameInput, 'input');
          dispatchEvent(emailInput, 'input');
          tick();
          fixture.detectChanges();
          let data = element.querySelector('.submit-data');
          expect(data).toHaveText('Value to submit: barretodavid, barretollano@gmail.com');
        });
      }))
      
    );
    
  });
  
});