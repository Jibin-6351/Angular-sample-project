import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Movie } from './movieDisplay';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carddetails',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './carddetails.component.html',
  styleUrl: './carddetails.component.css'
})
export class CarddetailsComponent {

  id!: string | null
  movie: Movie = {} as Movie;




  constructor(private http: HttpClient, private route: ActivatedRoute) { }




  headers = new HttpHeaders().set('Content-Type', 'application/json');



  Like() {



    this.http.put(`http://localhost:8080/movie/like/${this.id}`, {}, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).subscribe((res) => {
      console.log(res)
    })
    const dislike = document.getElementsByClassName("dislike-btn")[0] as HTMLButtonElement;
    dislike.style.pointerEvents = "none"
    dislike.style.opacity = "60%"


  }

  Dislike() {


    this.http.put(`http://localhost:8080/movie/dislike/${this.id}`, {}, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).subscribe((res) => {
      console.log(res)
    })

    const like = document.getElementsByClassName("like-btn")[0] as HTMLButtonElement;
    like.style.pointerEvents = "none"
    like.style.opacity="60%"
  }



  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<Movie>(`http://localhost:8080/movie/${this.id}`).subscribe((data) => {
      this.movie = data
      console.log(this.movie)



    })

  }



}
