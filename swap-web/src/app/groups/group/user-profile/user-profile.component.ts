import { Profile } from './../../../shared/models/profile.model';
import { ProfileService } from './../../../shared/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit {
  profile: Observable<Profile>;
  constructor(private readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.profile = this.profileService.getMyUserProfile();
    this.profileService
      .getMyUserProfile()
      .subscribe(profile => console.log(profile));
  }
}
