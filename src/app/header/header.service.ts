import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:8080/movie';

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
        return this.http.get(this.apiUrl);
    }


}