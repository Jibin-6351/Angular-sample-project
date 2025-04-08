import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';

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
    private authService: AuthServiceService
  ) {}

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

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
        error: (error) => {
          this.toastr.error(error.error.message);
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
