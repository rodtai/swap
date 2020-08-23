import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { GroupService } from './../shared/services/group.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../shared/models/group.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  constructor(
    private readonly groupSerivce: GroupService,
    private readonly dialog: MatDialog,
  ) {}

  public groups: Observable<Group[]>;

  public selectedGroup: BehaviorSubject<Group> = new BehaviorSubject(
    null,
  );

  public ngOnInit(): void {
    this.groups = this.groupSerivce.getGroups().pipe(
      map(groupResponse => {
        return groupResponse;
      }),
    );
  }

  public drop(event: CdkDragDrop<Group[]>): void {
    this.groupSerivce.moveGroup(
      event.previousIndex,
      event.currentIndex,
    );
  }

  public groupIconClicked(group: Group): void {
    this.selectedGroup.next(group);
  }

  public createGroupIconClicked(): void {
    this.dialog.open(CreateGroupDialogComponent);
  }
}
