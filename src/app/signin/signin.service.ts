import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private apiUrl = 'http://localhost:8080/user/sign-in';

  constructor(private http: HttpClient) {}

  onPost(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl,JSON.stringify(formData), { headers });
  }
}
