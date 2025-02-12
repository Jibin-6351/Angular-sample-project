import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  imports: [HttpClientModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})


export class CardComponent {

  constructor(private router: Router, private http: HttpClient) {

  }

  @Input() id!: number
  @Input() title: string = ""
  @Input() genre: string = ""
  @Input() rating: string = ""
  @Input() image: string = ""
  @Input() description: string = ""
  @Input() views!: number



  navigate() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    
    this.http.put(`http://localhost:8080/movie/views/${this.id}`, {}, { headers })
      .subscribe(() => {
        this.router.navigate(['/movies', this.id]);
      });




  }
}
