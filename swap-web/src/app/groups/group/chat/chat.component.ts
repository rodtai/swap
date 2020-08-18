import { GroupService } from './../../../shared/services/group.service';
import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../shared/models/chat.model';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  constructor(private readonly groupService: GroupService) {}

  @Input() selectedChat: Observable<Chat>;

  public messages: Observable<Message[]>;

  public nums = [...Array(50).keys()];

  ngOnInit(): void {
    this.selectedChat.subscribe((chat: Chat) => {
      this.messages = this.groupService.getMessagesForChat(chat);
    });
  }
}
