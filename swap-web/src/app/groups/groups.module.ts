import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group/group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChatComponent } from './group/chat/chat.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GroupsComponent, GroupComponent, ChatComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class GroupsModule {}
