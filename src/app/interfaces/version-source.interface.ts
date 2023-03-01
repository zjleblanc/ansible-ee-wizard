import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IVersionSource {
  getVersions: (query: string) => Observable<HttpResponse<string[]>>;
}
