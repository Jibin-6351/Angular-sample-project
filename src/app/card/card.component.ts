import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './card.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private router: Router, private movieService: MovieService) {}

  @Input() id!: number;
  @Input() title: string = '';
  @Input() genre: string = '';
  @Input() rating: string = '';
  @Input() image: string = '';
  @Input() description: string = '';
  @Input() views!: number;

  navigate() {
    this.movieService.updateViews(this.id).subscribe(() => {
      this.router.navigate(['/movies', this.id]);
    });
  }
}
