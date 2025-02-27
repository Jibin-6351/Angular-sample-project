import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  
  private btnValueSubject = new BehaviorSubject<boolean>(false); 
  btnValue$ = this.btnValueSubject.asObservable(); 

  constructor() { }

  
  changeValue(value: boolean): void {
    this.btnValueSubject.next(value); 
  }

}
