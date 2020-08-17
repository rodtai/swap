import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group/group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [GroupsComponent, GroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatIconModule,
    MatListModule,
  ],
})
export class GroupsModule {}
