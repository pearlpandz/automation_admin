import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { URLS } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  userTypes: any[] = [];

  loginForm: FormGroup;
  isProgress: boolean = false;
  isCompleted: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.required),
    });
  }

  // Login Form Submit 
  onSubmit(): void {
    this.isProgress = true;
    const url = URLS.LOGIN;
    const data = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password,
    }

    this.http.post(url, data).subscribe((res: any) => {
      this.isProgress = false;
      this.isCompleted = true;
      sessionStorage.setItem('qa_token', res.token);
      sessionStorage.setItem('qa_username', res.data.name);
      sessionStorage.setItem('qa_userid', res.data.id);
      sessionStorage.setItem('qa_role', res.data.role);
      if (res.data.role == 3) {
        this.router.navigateByUrl('/inventory')
      } else {
        this.router.navigateByUrl('/product')
      }
    }, (error) => {
      this.isProgress = false;
      this.isCompleted = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        sticky: true
      });
    })
  }
}
