import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  constructor(private readonly http: HttpClient) {}

  public getDummy(): Observable<any> {
    return this.http.get<any>('/api/dummy').pipe(
      mergeMap((mes: any) => {
        return of(mes.Content);
      }),
    );
  }
}
