import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly fireAuth: AngularFireAuth) {
    this.fireAuth.user.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  private currentUser: User = null;

  public login(): Promise<void> {
    return this.fireAuth.signInWithRedirect(
      new auth.GoogleAuthProvider(),
    );
  }

  public logout(): Promise<void> {
    return this.fireAuth.signOut();
  }

  public getUserObservable(): Observable<User> {
    return this.fireAuth.user;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getUserById(userId: string): User {
    return this.currentUser;
  }
}
