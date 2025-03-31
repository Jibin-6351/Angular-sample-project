import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { DatashareService } from '../datashare.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from './movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviees: Movie[] = [];
  filterMovie: any;
  filterbyYear: any[] = [];
  value!: number;
  filter!: boolean;
  allgenre: string[] = [];
  movieData: any;
  sizeCount = 0;
  error_nomovie: boolean = false;
  searching_movie_data: any;
  genre!: string;
  formattedDate!: string;
  hidetrend: boolean = false;
  ishidden: boolean = true;
  date1 = new FormControl('');
  date2 = new FormControl('');

  constructor(
    private homeService: HomeService,
    private dataShare: DatashareService,
    private router: Router
  ) {}

  changeValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = parseInt(selectedValue);
    this.sortMovies();
  }
  ngOnInit() {
    this.homeService.getData().subscribe((data) => {
      this.searching_movie_data = data;
    });

    this.homeService.getMovieByPage(this.sizeCount).subscribe((data) => {
      this.movieData = data.content;
      this.movieData.length < 9
        ? (this.ishidden = true)
        : (this.ishidden = false);
      this.filterMovie = data.content.filter((value: { rating: number }) => {
        return value.rating >= 9.0;
      });
    });
    this.dataShare.btnValue$.subscribe((currentValue) => {
      this.filter = currentValue;
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
  findData() {
    this.hidetrend = true;

    this.genre = (document.getElementById('genre') as HTMLInputElement).value;
    if (this.date1.value && this.date2.value && this.genre) {
      this.homeService
        .getMovieByReleaseDateAndGenre(
          this.date1.value,
          this.date2.value,
          this.genre,
          this.sizeCount
        )
        .subscribe((data) => {
          this.movieData = data.content;

          console.log(this.movieData);

          this.movieData.length === 0
            ? (this.error_nomovie = true)
            : (this.error_nomovie = false);
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
        });
    } else if (this.date1.value && this.date2.value) {
      this.homeService
        .getMovieRelease(this.date1.value!, this.date2.value!, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          console.log(data.content);
          this.movieData.length === 0
            ? (this.error_nomovie = true)
            : (this.error_nomovie = false);
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
        });
    } else if (this.genre) {
      this.homeService
        .filterByGenre(this.genre, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          this.movieData.length == 0
            ? (this.error_nomovie = true)
            : (this.error_nomovie = false);
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
        });
    } else if (this.date1.value) {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString().slice(-2);
      this.formattedDate = `${day}/${month}/${year}`;
      this.homeService
        .getMovieRelease(this.date1.value, this.formattedDate, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          console.log(data.content);
          this.movieData.length == 0
            ? (this.error_nomovie = true)
            : (this.error_nomovie = false);
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
        });
    }
  }

  filterId(id: string) {
    this.router.navigate(['/movies', id]);
  }
  cancelD1() {
    const d1 = document.getElementsByName('date1')[0] as HTMLInputElement;
    d1.value = '';
    this.date1.reset();
  }
  cancelD2() {
    const d2 = document.getElementsByName('date2')[0] as HTMLInputElement;
    d2.value = '';
    this.date2.reset();
  }

  nextMovie() {
    const prevButton = document.getElementsByClassName(
      'prev'
    )[0] as HTMLButtonElement;
    this.sizeCount = this.sizeCount + 1;
    if (this.genre) {
      this.homeService
        .filterByGenre(this.genre, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);

          if (this.sizeCount > 0) prevButton.style.visibility = 'visible';
        });
    } else if (this.date1.value) {
      this.homeService
        .getMovieRelease(this.date1.value, this.formattedDate, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
          if (this.sizeCount > 0) prevButton.style.visibility = 'visible';
        });
    } else if (this.date1.value && this.date2.value) {
      this.homeService
        .getMovieRelease(this.date1.value!, this.date2.value!, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
          console.log(data.content);
          if (this.sizeCount > 0) prevButton.style.visibility = 'visible';
        });
    } else if (this.date1.value && this.date2.value && this.genre) {
      this.homeService
        .getMovieByReleaseDateAndGenre(
          this.date1.value,
          this.date2.value,
          this.genre,
          this.sizeCount
        )
        .subscribe((data) => {
          this.movieData = data.content;
          this.movieData.length < 9
            ? (this.ishidden = true)
            : (this.ishidden = false);
          if (this.sizeCount > 0) prevButton.style.visibility = 'visible';
        });
    } else {
      this.homeService.getMovieByPage(this.sizeCount).subscribe((data) => {
        this.movieData = data.content;
        this.movieData.length < 9
          ? (this.ishidden = true)
          : (this.ishidden = false);
        if (this.sizeCount > 0) {
          prevButton.style.visibility = 'visible';
        }
      });
    }
  }

  previousMovie() {
    const prevButton = document.getElementsByClassName(
      'prev'
    )[0] as HTMLButtonElement;
    this.sizeCount = this.sizeCount - 1;
    if (this.genre) {
      this.homeService
        .filterByGenre(this.genre, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          if (this.sizeCount == 0) prevButton.style.visibility = 'hidden';
        });
    } else if (this.date1.value) {
      this.homeService
        .getMovieRelease(this.date1.value, this.formattedDate, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          console.log(data.content);
          if (this.sizeCount == 0) prevButton.style.visibility = 'hidden';
        });
    } else if (this.date1.value && this.date2.value) {
      this.homeService
        .getMovieRelease(this.date1.value!, this.date2.value!, this.sizeCount)
        .subscribe((data) => {
          this.movieData = data.content;
          console.log(data.content);
          if (this.sizeCount == 0) prevButton.style.visibility = 'hidden';
        });
    } else if (this.date1.value && this.date2.value && this.genre) {
      this.homeService
        .getMovieByReleaseDateAndGenre(
          this.date1.value,
          this.date2.value,
          this.genre,
          this.sizeCount
        )
        .subscribe((data) => {
          this.movieData = data.content;
          console.log(this.movieData.length);
          if (this.sizeCount == 0) prevButton.style.visibility = 'hidden';
        });
    } else {
      this.homeService.getMovieByPage(this.sizeCount).subscribe((data) => {
        this.movieData = data.content;
        if (this.sizeCount == 0) {
          prevButton.style.visibility = 'hidden';
        }
      });
    }
  }
}
