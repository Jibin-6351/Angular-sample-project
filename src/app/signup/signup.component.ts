import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private router: Router, private signupService: SignupService) {}

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    countryCode: new FormControl(''),
    mobileNumber: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dob: new FormControl(''),
  });
  navigate() {
    console.log('clicked');
    this.router.navigate(['/signin']);
  }

  onSubmit() {
    if (this.isAnyFieldEmpty()) {
      alert('Please fill all the fields!');
    } else {
      this.signupService.onPost(this.signupForm.value).subscribe((data) => {
        if (data.message == 'success') {
          this.router.navigate(['/signin']);
        }
      });
    }
  }

  isAnyFieldEmpty(): boolean {
    return Object.values(this.signupForm.value).some((value) => {
      return (
        value === null || value === undefined || value.toString().trim() === ''
      );
    });
  }
}
