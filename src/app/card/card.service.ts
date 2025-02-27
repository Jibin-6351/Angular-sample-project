import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private apiUrl = 'http://localhost:8080/movie/views';

    constructor(private http: HttpClient) { }


updateViews(id:number):Observable<string>{
    return this.http.put<string>(`${this.apiUrl}/${id}`,{})

}



}