import { UserService } from './../shared/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass'],
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    public readonly userService: UserService,
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.userService.getCurrentUser()) {
      this.userService.login().then(this.goToGroups);
    } else {
      this.goToGroups();
    }
  }

  private goToGroups(): void {
    this.router.navigate(['groups']);
  }
}
