import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getData(updateData: {}): Observable<any> {
    console.log(updateData);
    return this.http.put(
      `${this.apiUrl}/update-password`,
      JSON.stringify(updateData)
    );
  }
}
