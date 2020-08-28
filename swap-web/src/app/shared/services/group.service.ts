import { UserService } from './../user.service';
import { Message, Media } from './../models/message.model';
import { Chat } from './../models/chat.model';
import { Group } from './../models/group.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
  ) {}

  private allChats: Chat[][] = [
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

  private messages: BehaviorSubject<Message[]> = new BehaviorSubject([
    {
      id: '1',
      user_id: '1',
      date_posted: new Date(),
      body: [
        {
          type: 'text',
          // tslint:disable-next-line: quotemark
          content: "What's up! My name is Phil. What's yours?",
        },
      ],
    },
  ]);

  private groups: BehaviorSubject<Group[]> = new BehaviorSubject([]);

  public getGroups(): Observable<Group[]> {
    this.http
      .get<Group[]>('/api/groups')
      .subscribe((groups: Group[]) => {
        this.groups.next(groups);
      });
    return this.groups;
  }

  public createGroup(group: Group): void {
    this.http
      .post('/api/groups', group)
      .pipe(first())
      .subscribe((groupCreated: Group) => {
        this.groups.value.push(groupCreated);
      });
  }

  public moveGroup(prevIndex: number, currIndex: number): void {
    const groups = this.groups.value;
    moveItemInArray(groups, prevIndex, currIndex);
  }

  public getChatsForGroup(
    group: Group,
  ): Observable<{ chats: Chat[] }> {
    const idx = this.groups.value.findIndex(g => g.id === group.id);
    return of({ chats: this.allChats[idx] });
  }

  public getMessagesForChat(chat: Chat): Observable<Message[]> {
    return this.messages;
  }

  public postTextMessageInChat(chat: Chat, text: string): void {
    const lastMessage = this.messages.value[
      this.messages.value.length - 1
    ];
    const currentUserId = this.userService.getCurrentUser().uid;
    const clonedMessages = Array.from(this.messages.value);
    const newMessage: Media = {
      type: 'text',
      content: text,
    };
    if (lastMessage.user_id === currentUserId) {
      clonedMessages[clonedMessages.length - 1].body.push(newMessage);
      clonedMessages[
        clonedMessages.length - 1
      ].date_posted = new Date();
    } else {
      clonedMessages.push({
        id: '2',
        user_id: currentUserId,
        date_posted: new Date(),
        body: [newMessage],
      });
    }
    this.messages.next(clonedMessages);
  }
}
