import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../shared/models/chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  constructor() {}
  @Input() selectedChat: Observable<Chat>;

  ngOnInit(): void {}
}
