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
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/packages/${query}?limit=${limit}&offset=${offset}`,
      { observe: 'response' }
    );
  }

  getVersions(package_name: string): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/packages/${package_name}/versions`,
      { observe: 'response' }
    );
  }
}
