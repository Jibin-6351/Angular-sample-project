import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './dropdown.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  constructor(
    private logoutService: LogoutComponent,
    private authService: AuthService,
    private router:Router
  ) {}
  Logout() {
    this.logoutService.getData().subscribe({
      next: (data) => {
        console.log(data);
        this.authService.logout();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  navigate(){
this.router.navigate(['/profile'])
  }
}
