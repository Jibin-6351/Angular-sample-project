import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Carddetails {
  private apiUrl = 'http://localhost:8080/movie';

  constructor(private http: HttpClient) {}

  getData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  likeMovie(id: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/like/${id}`, {});
  }
  disLikeMovie(id:string):Observable<string>{
    return this.http.put<string>(`${this.apiUrl}/dislike/${id}`, {})
  }
}
