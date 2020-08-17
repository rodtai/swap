import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group/group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChatComponent } from './group/chat/chat.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [GroupsComponent, GroupComponent, ChatComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
  ],
})
export class GroupsModule {}
