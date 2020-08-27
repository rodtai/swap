import { ProfileService } from './../shared/services/profile.service';
import {
  Profile,
  CreatedProfile,
} from './../shared/models/profile.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.sass'],
})
export class CreateProfileComponent implements OnInit {
  fullName: string;
  displayName: string;
  whatIDo: string;
  profilePicture: string;

  constructor(private readonly profileService: ProfileService) {}

  ngOnInit(): void {}

  public onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        if (typeof reader.result === 'string') {
          this.profilePicture = reader.result.toString();
        }
      });
      reader.readAsDataURL(file);
    }
  }

  public removeProfilePicture(): void {
    this.profilePicture = '';
  }

  public createProfile(): void {
    const createdProfile: CreatedProfile = {
      fullName: this.fullName,
      displayName: this.displayName,
      description: this.whatIDo,
      profilePicture: this.profilePicture,
    };
    this.profileService.createMyUserProfile(createdProfile);
  }
}
