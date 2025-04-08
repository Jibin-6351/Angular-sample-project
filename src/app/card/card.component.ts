import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './card.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(
    private router: Router,
    private movieService: MovieService,
    private authService: AuthServiceService
  ) {}

  @Input() id!: number;
  @Input() director = '';
  @Input() dislikemovie = '';
  @Input() movieImage = '';
  @Input() likemovie = '';
  @Input() movie_trailer = '';
  @Input() releaseDate = '';
  @Input() title = '';
  @Input() description = '';
  @Input() views = '';
  @Input() rating = '';
  @Input() genre = '';
  @Input() duration = '';

  navigate() {
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated());
      this.movieService.updateViews(this.id).subscribe({
        next: () => {
          this.router.navigate(['/movies', this.id]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    this.router.navigate(['/signin']);
  }
}
