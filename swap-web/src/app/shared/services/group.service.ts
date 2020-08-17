import { Chat } from './../models/chat.model';
import { Group } from './../models/group.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private readonly http: HttpClient) {}

  allGroups: Group[] = [
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
      chatIds: ['1', '2', '3'],
    },
    {
      id: '1',
      name: 'Group 3',
      icon: 'assets/groups/group3.svg',
      chatIds: [],
    },
  ];

  allChats: Chat[][] = [
    [
      {
        id: '1',
        name: 'general',
        messageIds: [],
      },
      {
        id: '1',
        name: 'bali',
        messageIds: [],
      },
    ],
    [
      {
        id: '1',
        name: 'general',
        messageIds: [],
      },
      {
        id: '2',
        name: 'support',
        messageIds: [],
      },
      {
        id: '3',
        name: 'marketing',
        messageIds: [],
      },
    ],
    [
      {
        id: '1',
        name: 'general',
        messageIds: [],
      },
    ],
  ];

  public getGroups(): Observable<{ groups: Group[] }> {
    return of({ groups: this.allGroups });
  }

  public getChatsForGroup(
    group: Group,
  ): Observable<{ chats: Chat[] }> {
    const idx = this.allGroups.findIndex(g => g.id === group.id);
    return of({ chats: this.allChats[idx] });
  }
}
