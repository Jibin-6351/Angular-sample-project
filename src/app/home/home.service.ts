import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:8080/movie';

  constructor(private http: HttpClient) {}

  getData(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/path`);
  }
  getMovieRelease(date1:string,date2:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiUrl}/release?date1=${encodeURIComponent(date1)}&date2=${encodeURIComponent(date2)}`)
  }
  getMovieReleaseDate(date1:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiUrl}/byreleasedate/${date1}`)
  }
}
