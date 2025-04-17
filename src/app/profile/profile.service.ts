import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getData(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
