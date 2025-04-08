import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:8080/movie';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }
  getMovieRelease(date1:string,date2:string,size:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/release?date1=${encodeURIComponent(date1)}&date2=${encodeURIComponent(date2)}&size=${encodeURIComponent(size)}`)
  }
  getMovieByPage(size:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/moviebypage?size=${encodeURIComponent(size)}`)
  }
  filterByGenre(genre:string,size:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/moviebygenre?genre=${encodeURIComponent(genre)}&size=${encodeURIComponent(size)}`)
  }
  getMovieByReleaseDateAndGenre(date1:string,date2:string,genre:string,size:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/moviebyreleasedategenre?date1=${encodeURIComponent(date1)}&date2=${date2}&genre=${genre}&size=${size}`)
  }
}
