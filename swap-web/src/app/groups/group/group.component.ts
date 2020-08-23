import { first, map } from 'rxjs/operators';
import { GroupService } from './../../shared/services/group.service';
import { Chat } from './../../shared/models/chat.model';
import { Group } from './../../shared/models/group.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass'],
})
export class GroupComponent implements OnInit {
  constructor(private readonly groupService: GroupService) {}

  @Input() selectedGroup: Observable<Group>;
  public groupChats: Observable<Chat[]>;
  public selectedChat: BehaviorSubject<Chat> = new BehaviorSubject(
    null,
  );

  ngOnInit(): void {
    this.selectedGroup.subscribe((group: Group) => {
      this.groupChats = this.groupService
        .getChatsForGroup(group)
        .pipe(
          first(),
          map(res => res.chats),
        );
    });
  }

  chatClicked(chat: Chat): void {
    this.selectedChat.next(chat);
  }
}
