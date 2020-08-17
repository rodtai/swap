import { GroupService } from './../shared/services/group.service';
import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Group } from '../shared/models/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  constructor(private readonly groupSerivce: GroupService) {}

  public groups: Observable<Group[]>;

  ngOnInit(): void {
    this.groups = this.groupSerivce.getGroups().pipe(
      first(),
      map(groupResponse => {
        return groupResponse.groups;
      }),
    );
  }
}
