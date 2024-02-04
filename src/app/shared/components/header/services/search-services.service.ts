import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IProdect } from '../../../../Models/iprodect';

// import { environment } from '../../../../environments/environment';
// import { environment } from '../../../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class SearchServicesService {
  httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  getProductsBySearch(query: string) {
    return this.http
      .get<IProdect[]>(`${environment.baseApi}products/search?q=${query}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
