import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-autocomplete',
  imports: [NgbTypeaheadModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private dataShare: DatashareService
  ) {}

  allMovie!: any[];
  names: any;
  model!: any;
  buttonChange: boolean = true;
  autoComplete: any = [];

  ngOnInit() {
    this.homeService.getData().subscribe((data) => {
      this.autoComplete = data;
      this.names = this.autoComplete.map(
        (data: { id: any; title: any; file: { path: any } }) => {
          return { id: data.id, name: data.title, path: data.file.path };
        }
      );

      this.allMovie = data;
    }
  )
  }

  onModelChange(newValue: any): void {
    const id = this.allMovie.find((movie) => movie.id == newValue.id);
    this.router.navigate(['/movies', id.id]);
  }

  search: OperatorFunction<string, readonly { name: any; flag: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.names
              .filter(
                (v: { name: string }) =>
                  v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;

  change() {
    if (this.buttonChange) {
      this.dataShare.changeValue(true);
      this.buttonChange = false;
    } else {
      this.dataShare.changeValue(false);
      this.buttonChange = true;
    }
  }
}
