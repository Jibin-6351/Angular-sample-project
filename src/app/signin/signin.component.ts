import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from './signin.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {

  constructor(private signinService :SigninService,private router:Router){}

  signinForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })


onSubmit(){
 if(this.isAnyFieldEmpty()){
  alert('Please fill all the fields!');
 }else{
this.signinService.onPost(this.signinForm.value).subscribe((data)=>{
  console.log(data)
})
 }
}
isAnyFieldEmpty(): boolean {
  return Object.values(this.signinForm.value).some((value) => {
    return (
      value === null || value === undefined || value.toString().trim() === ''
    );
  });
}
navigate(){
  console.log("clicked")
this.router.navigate(['/signup'])
}
}
