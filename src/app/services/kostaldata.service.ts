import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KostaldataService {

  apiUrlAll = 'http://localhost:666/plenticore';

  constructor(private http: HttpClient) {
  }

  getApiData() {
    return this.http.get<[]>(this.apiUrlAll).pipe(
      retry(3),
      catchError(error => {
        console.error(error);
        return error;
      }),
      shareReplay()
    );
  }
}
