import { Component } from '@angular/core';
import { Movie } from './movieDisplay';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carddetails } from './carddetails.service';

@Component({
  selector: 'app-carddetails',
  imports: [CommonModule],
  templateUrl: './carddetails.component.html',
  styleUrl: './carddetails.component.css',
})
export class CarddetailsComponent {
  id!: string;
  movie: Movie = {} as Movie;
  movieLike!: number;
  movieDislike!: number;

  constructor(
    private route: ActivatedRoute,
    private cardDetails: Carddetails
  ) {}

  Like() {
    this.cardDetails.likeMovie(this.id).subscribe((res) => {
      this.movieLike = parseInt(res);
      console.log(this.movieLike);
    });
    const dislike = document.getElementsByClassName(
      'dislike-btn'
    )[0] as HTMLButtonElement;
    dislike.style.pointerEvents = 'none';
    dislike.style.opacity = '60%';
    const like = document.getElementsByClassName(
      'like-btn'
    )[0] as HTMLButtonElement;
    like.disabled = true;
  }

  Dislike() {
    this.cardDetails.disLikeMovie(this.id).subscribe((res) => {
      this.movieDislike = parseInt(res);
    });

    const like = document.getElementsByClassName(
      'like-btn'
    )[0] as HTMLButtonElement;
    like.style.pointerEvents = 'none';
    like.style.opacity = '60%';
    const dislike = document.getElementsByClassName(
      'dislike-btn'
    )[0] as HTMLButtonElement;
    dislike.disabled = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.cardDetails.getData(this.id).subscribe((data) => {
      this.movie = data;
      this.movieLike = data.likemovie;
      this.movieDislike = data.dislikemovie;
    });
  }

  play() {
    const url = this.movie.movie_trailer;
    window.open(url);
  }
}
