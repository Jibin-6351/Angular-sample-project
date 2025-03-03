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
  imports: [CardComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviees: Movie[] = [];
  filterMovie: Movie[] = [];
  filterbyYear:any[]=[];
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

  }
  findData(){


    const value=(document.getElementById("genre") as HTMLInputElement).value


    if(this.date1.value&& this.date2.value&&value){
      this.homeService.getMovieRelease(this.date1.value !,this.date2.value !).subscribe((data)=>{
        this.filterbyYear=data.filter((item)=>item.genre==value)
        
       })

    }else if(this.date1.value&&this.date2.value){
      this.homeService.getMovieRelease(this.date1.value !,this.date2.value !).subscribe((data)=>{
        this.filterbyYear=data
        console.log(data)
    })
  }else if(value){
    this.filterbyYear=this.moviees.filter((data)=>data.genre===value)
    console.log(this.filterbyYear)
  }else if(this.date1.value){
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); 
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
const year = currentDate.getFullYear().toString().slice(-2); 
const formattedDate = `${day}/${month}/${year}`;
this.homeService.getMovieRelease(this.date1.value,formattedDate).subscribe((data)=>{
this.filterbyYear=data;
})
}


  }

  filterId(id:string){
    this.router.navigate(['/movies', id]);
    
  }
  cancelD1(){
    const d1 = document.getElementsByName('date1')[0] as HTMLInputElement;
    d1.value = '';
  }
  cancelD2(){
    console.log("invocked")
    const d2 = document.getElementsByName('date2')[0] as HTMLInputElement;
    d2.value = '';
  }
  
  
}
