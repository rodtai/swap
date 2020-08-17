import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
} from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then(m => m.GroupsModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(m => m.LandingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
