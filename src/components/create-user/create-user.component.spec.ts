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

import {dispatchEvent} from 'angular2/src/testing/utils';
import {By} from 'angular2/platform/browser';
import {FormBuilder} from 'angular2/common';

import {Router} from 'angular2/router';
import {UserService} from '../user-utils/user.service';

import {MockRouter} from '../../mocks/router.mock';
import {MockUserService} from '../user-utils/user.service.mock';
import {provide} from "angular2/core";

import {CreateUserComponent} from './create-user.component';


interface IElements {
  element: HTMLElement;
  form: HTMLFormElement;
  usernameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  fixture: ComponentFixture;
}

function createComponent(tcb: TestComponentBuilder): Promise<IElements> {
  return tcb
    .overrideProviders(CreateUserComponent, [provide(UserService, {useClass: MockUserService})])
    .createAsync(CreateUserComponent)
    .then((fixture: ComponentFixture) => {
      let element = fixture.debugElement.nativeElement;
      let form = fixture.debugElement.query(By.css('form')).nativeElement;
      let usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
      let emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
      fixture.detectChanges();
      return {element, form, usernameInput, emailInput, fixture};
    });
}


describe('When testing the CreateUserComponent', () => {
  
  beforeEachProviders(() => {
    return [
      FormBuilder,
      provide(Router, {useClass: MockRouter})
    ];
  });
    
  describe('When leaving the username field blank', () => {
    
    it('should show the "required" error message in the template', 
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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
        return createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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
        return createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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
        return createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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
        return createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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
        createComponent(tcb)
          .then(({element, form, usernameInput, emailInput, fixture}) => {
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