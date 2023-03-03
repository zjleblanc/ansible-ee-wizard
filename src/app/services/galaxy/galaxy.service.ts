import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVersionSource } from 'src/app/interfaces/version-source.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalaxyService implements IVersionSource {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/collections/${query}`,
      { observe: 'response' }
    );
  }

  getVersions(collection_name: string): Observable<HttpResponse<string[]>> {
    console.log(`${environment.apiBaseUrl}/collections/${collection_name}/versions`);
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/collections/${collection_name}/versions`,
      { observe: 'response' }
    );
  }
}
