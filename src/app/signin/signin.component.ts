import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(
    private signinService: SigninService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  googleLogin() {
    this.signinService.loginWithGoogle().subscribe((result) => {
      this.signinService
        .onAuth({
          firstname: result.user.displayName,
          email: result.user.email,
        })
        .subscribe({
          next: (data) => {
            if (data.message == 'Success') {
              this.authService.setToken(data.token);
              location.replace('/');
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });
    });
  }
  githubLogin() {
    this.signinService.loginWithGitHub().subscribe((result) => {
      console.log({
        firstname: result.user.displayName,
        email: result.user.email,
      });
      this.signinService
        .onAuth({
          firstname: result.user.displayName,
          email: result.user.email,
        })
        .subscribe({
          next: (data) => {
            if (data.message == 'Success') {
              this.authService.setToken(data.token);
              console.log(data);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });
    });
  }

  logout() {
    this.signinService.logout();
  }

  onSubmit() {
    if (this.isAnyFieldEmpty()) {
      this.toastr.error('Please fill all the fields!');
    } else {
      this.signinService.onPost(this.signinForm.value).subscribe({
        next: (data) => {
          if (data.message == 'success') {
            this.authService.setToken(data.token);
            location.replace('/');
          } else {
            this.toastr.error(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(Object.entries(err.error));
          Object.entries(err.error).forEach(([field, message]) => {
            this.toastr.error(`${message}`);
          });
        },
      });
    }
  }
  isAnyFieldEmpty(): boolean {
    return Object.values(this.signinForm.value).some((value) => {
      return (
        value === null || value === undefined || value.toString().trim() === ''
      );
    });
  }
  navigate() {
    console.log('clicked');
    this.router.navigate(['/signup']);
  }
}
