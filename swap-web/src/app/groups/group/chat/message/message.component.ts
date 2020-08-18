import { User } from 'firebase/app';
import { UserService } from './../../../../shared/user.service';
import { Message } from './../../../../shared/models/message.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  public user: User;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserById(this.message.id);
  }
}
