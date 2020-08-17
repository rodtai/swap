import { first, map } from 'rxjs/operators';
import { GroupService } from './../../shared/services/group.service';
import { Chat } from './../../shared/models/chat.model';
import { Group } from './../../shared/models/group.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass'],
})
export class GroupComponent implements OnInit {
  constructor(private groupService: GroupService) {}

  @Input() selectedGroup: Observable<Group>;
  public groupChannels: Observable<Chat[]>;

  ngOnInit(): void {
    this.selectedGroup.subscribe((group: Group) => {
      this.groupChannels = this.groupService
        .getChatsForGroup(group)
        .pipe(
          first(),
          map(res => res.chats),
        );
    });
  }
}
