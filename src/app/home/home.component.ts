import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Movie } from './movie';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviees: Movie[] = [];
  filterMovie: Movie[] = [];

  value!: number;

  constructor(private http: HttpClient) { }

  changeValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = parseInt(selectedValue);
    this.sortMovies();
  }

  ngOnInit() {
    this.http.get<Movie[]>('http://localhost:8080/movie/path').subscribe((data) => {
      this.moviees = data

      this.filterMovie = data.filter((value) => { return value.views > 14 })

      console.log(this.moviees)
    });
  }

  sortMovies() {
    switch (this.value) {
      case 1:
        this.moviees.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 2:
        this.moviees.sort((a, b) => {
          const dateA = new Date(a.releaseDate);
          const dateB = new Date(b.releaseDate);
          return dateA.getTime() - dateB.getTime();
        });
        break;
    }
  }
}
