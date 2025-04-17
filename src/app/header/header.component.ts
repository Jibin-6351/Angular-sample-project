import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './header.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Router } from '@angular/router';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth-service.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    AutocompleteComponent,
    DropdownComponent,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private dataShare: DatashareService,
    private authService: AuthService
  ) {}

  movieName!: any[];

  allMovie!: any[];

  selectedMovie!: string;

  filterMovie!: any[];

  buttonChange: boolean = true;

  profile_icon = false;

  change() {
    if (this.buttonChange) {
      this.dataShare.changeValue(true);
      this.buttonChange = false;
    } else {
      this.dataShare.changeValue(false);
      this.buttonChange = true;
    }
  }

  ngOnInit(): void {
    this.profile_icon = this.authService.isAuthenticated();
    this.apiService.getData().subscribe((data) => {
      (this.allMovie = data),
        (this.movieName = data.map((value: { title: any }) => value.title));
    });
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.movieDetails(value);
  }

  movieDetails(text: string) {
    const id = this.allMovie.filter((movie) => {
      if (movie.title == text) {
        return movie.id;
      }
    });

    this.router.navigate(['/movies', id[0].id]);
  }
  navigate() {
    this.router.navigate(['/signin']);
  }

  addmovie() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/addmovie']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
  navigateProfile() {
    this.router.navigate(['/profile']);
  }
}
