import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Movie } from './movie';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { DatashareService } from '../datashare.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviees: Movie[] = [];
  filterMovie: Movie[] = [];
  filterbyYear:any
  value!: number;
  filter!: boolean;


date1=new FormControl("");
date2=new FormControl("");

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
      this.moviees = data;
      this.filterMovie = data.filter((value) => {
        return value.views > 14;
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

  find(event:Event){
    const value=(event.target as HTMLInputElement).value
    console.log(value)

  }
  findData(){

   this.homeService.getMovieRelease(this.date1.value !,this.date2.value !).subscribe((data)=>{
    this.filterbyYear=data
    console.log(this.filterbyYear.length)
   })

  }

  filterId(id:string){
    this.router.navigate(['/movies', id]);
    
  }
  
}
