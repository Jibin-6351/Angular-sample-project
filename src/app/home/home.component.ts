import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { movie } from './movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 moviees:movie[]=[
  {movieid:1,moviename:"cars1"},
  {movieid:2,moviename:"cars2"},
  {movieid:3,moviename:"cars3"},
  {movieid:3,moviename:"cars3"},

]



}
