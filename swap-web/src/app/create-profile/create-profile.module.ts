import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProfileRoutingModule } from './create-profile-routing.module';
import { CreateProfileComponent } from './create-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CreateProfileComponent],
  imports: [
    CommonModule,
    CreateProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class CreateProfileModule {}
