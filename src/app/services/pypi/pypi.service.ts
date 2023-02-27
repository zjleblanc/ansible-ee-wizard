import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PypiService {

  constructor(private http: HttpClient) { }

  search(query: string, limit=50, offset=0): Observable<HttpResponse<string[]>> {
    console.log(`${environment.apiBaseUrl}/search/${query}?limit=${limit}&offset=${offset}`);
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/search/${query}?limit=${limit}&offset=${offset}`,
      { observe: 'response' }
    );
  }
}
