import { LoginComponent } from './login.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, ButtonModule],
    })
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // username
  it('[Username-Invalid-Check]: username is invalid, If no values entered', () => {
    let username = component.loginForm.controls['username']
    expect(username.valid).toBeFalse();
  })

  it('[Username-Valid-Check]: username is valid, If values entered', () => {
    let username = component.loginForm.controls['username']
    username.setValue('rajesh');
    expect(username.valid).toBeTruthy();
  })

  // username
  it('[Password-Invalid-Check]: password is invalid, If no values entered', () => {
    let username = component.loginForm.controls['username']
    expect(username.valid).toBeFalsy();
  })

  it('[Password-Valid-Check]: password is valid, If values entered', () => {
    let password = component.loginForm.controls['password']
    password.setValue('password');
    expect(password.valid).toBeTruthy();
  })

  it('[Form-Valid-Check]: Form is valid, If values entered', () => {
    component.loginForm.controls['username'].setValue('rajesh');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('[Form-Invalid-Check]: Form is invalid, If values are not entered', () => {
    expect(component.loginForm.valid).toBeFalsy();
  })

  it('[Form-Submit]: Form is invalid, If values are not entered', () => {
    // Form invalid intially, If no values entered
    expect(component.loginForm.valid).toBeFalsy();
    let btn = fixture.debugElement.query(By.css('p-button > button'))
    const button = btn.nativeElement as HTMLButtonElement;
    expect(button.disabled).toEqual(true); // check button is disabled


    // Form valid, after values entered
    component.loginForm.controls['username'].setValue('rajesh');
    component.loginForm.controls['password'].setValue('password');
    fixture.detectChanges();
    expect(button.disabled).toEqual(false);

    component.onSubmit();
    fixture.detectChanges();
  })



});

