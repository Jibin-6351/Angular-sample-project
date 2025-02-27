import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})



export class DropdownComponent {

  a:boolean=false;

  
  showMovie(event:Event){
    let range=(event.target as HTMLInputElement).value
    console.log("Range 2024 to "+range)
  }



  show(){
    
      console.log("clicked "+this.a)
      if(this.a){

        const divrange= document.getElementsByClassName(
          'range'
        )[0] as HTMLButtonElement;
        divrange.style.display='block'
        this.a=false
      }else{
        const divrange= document.getElementsByClassName(
          'range'
        )[0] as HTMLButtonElement;
        divrange.style.display='none'
        this.a=true
      }
    
    }
    
  
  



}
