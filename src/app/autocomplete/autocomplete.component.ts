import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  imports: [NgbTypeaheadModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {
  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.homeService.getData().subscribe((data) => {
      this.allMovie = data;
      this.names = data.map((val) => {
        return val.title;
      });
    });
  }
  allMovie!: any[];
  names: any;
  model!:any

  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.names
              .filter(
                (v: string) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  onModelChange(newValue: string): void {
    const id = this.allMovie.find((movie) => movie.title==newValue);
    if(id){
      this.router.navigate(['/movies', id.id]);
    }
  }
}
