import { Group } from './../models/group.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private readonly http: HttpClient) {}

  public getGroups(): Observable<{ groups: Group[] }> {
    return of({
      groups: [
        {
          id: '1',
          name: 'Group 1',
          icon: 'assets/groups/group1.svg',
          chatIds: [],
        },
        {
          id: '2',
          name: 'Group 2',
          icon: 'assets/groups/group2.svg',
          chatIds: [],
        },
        {
          id: '1',
          name: 'Group 3',
          icon: 'assets/groups/group3.svg',
          chatIds: [],
        },
      ],
    });
  }
}
