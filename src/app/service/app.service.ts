import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Item, NewItem } from '../state/app.reducer';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/items').pipe(
      tap(data => console.log(data)), // eyeball results in the console
      catchError(this.handleError)
    );
  }

  addItem(item: NewItem): Observable<Item> {
    return this.http.post<Item>('/api/items', item).pipe(
      catchError(this.handleError)
    );
  }

  removeItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`/api/items/${item.id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return throwError(error);
  }
}