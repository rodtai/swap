import { GroupService } from './../../shared/services/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.sass'],
})
export class CreateGroupDialogComponent implements OnInit {
  groupName = '';

  constructor(private readonly groupService: GroupService) {}

  ngOnInit(): void {}

  public onCreate(): void {
    this.groupService.createGroup(this.groupName);
  }
}
