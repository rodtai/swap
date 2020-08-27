export interface Profile extends CreatedProfile {
  id: string;
}

export interface CreatedProfile {
  fullName: string;
  displayName: string;
  description: string;
  profilePicture: string;
}
