import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { ProfileService } from './profile.service';
import { NgbdModalComponent } from '../password/password.component';


@Component({
  selector: 'app-profile',
  imports: [NgbdModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  id!: number;
  data: any;

  constructor(
    private authServie: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.id = +this.authServie.getUser();
    this.profileService.getData(this.id).subscribe({
      next: (data) => {
        this.data = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
