import { GroupService } from './../shared/services/group.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Group } from '../shared/models/group.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  constructor(private readonly groupSerivce: GroupService) {}

  public groups: Observable<Group[]>;

  public selectedGroup: BehaviorSubject<Group> = new BehaviorSubject(
    null,
  );

  public ngOnInit(): void {
    this.groups = this.groupSerivce.getGroups().pipe(
      first(),
      map(groupResponse => {
        return groupResponse.groups;
      }),
    );
  }

  public async drop(event: CdkDragDrop<Group[]>): Promise<void> {
    moveItemInArray(
      await this.groups.toPromise(),
      event.previousIndex,
      event.currentIndex,
    );
  }

  public groupIconClicked(group: Group): void {
    this.selectedGroup.next(group);
  }
}
