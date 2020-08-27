import { Profile, CreatedProfile } from './../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  public getMyUserProfile(): Observable<Profile> {
    return this.http.get<Profile>('/api/profile');
  }

  public createMyUserProfile(
    createdProfile: CreatedProfile,
  ): Observable<Profile> {
    return this.http.post<Profile>('/api/profile', {});
  }
}
