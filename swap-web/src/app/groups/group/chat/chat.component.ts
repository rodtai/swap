import { GroupService } from './../../../shared/services/group.service';
import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../shared/models/chat.model';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  constructor(private readonly groupService: GroupService) {}

  @Input() selectedChat: Observable<Chat>;
  currentMessage = '';

  public messages: Observable<Message[]>;

  ngOnInit(): void {
    this.selectedChat.pipe(first()).subscribe((chat: Chat) => {
      this.messages = this.groupService.getMessagesForChat(chat);
    });
  }

  sendMessage(): void {
    this.selectedChat.pipe(first()).subscribe((chat: Chat) => {
      this.groupService.postTextMessageInChat(
        chat,
        this.currentMessage,
      );
      this.currentMessage = '';
    });
  }
}
