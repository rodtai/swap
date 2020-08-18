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
import { TextFieldModule } from '@angular/cdk/text-field';
import { DividerComponent } from './group/chat/divider/divider.component';
import { MessageComponent } from './group/chat/message/message.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupComponent,
    ChatComponent,
    DividerComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    TextFieldModule,
    MatTooltipModule,
    FormsModule,
  ],
})
export class GroupsModule {}
