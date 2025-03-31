import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:8080/user/sign-up';

  constructor(private http: HttpClient) {}

  onPost(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl,JSON.stringify(formData), { headers });
  }
}
