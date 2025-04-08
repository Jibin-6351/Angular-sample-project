import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './dropdown.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-dropdown',
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  constructor(
    private logoutService: LogoutComponent,
    private authService: AuthServiceService
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
    console.log('clicked');
  }
}
