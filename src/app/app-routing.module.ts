import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPostComponent } from './user/user-post/user-post.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/myposts/allpost', pathMatch: 'full' },
  { path: 'myprofile', component: ProfileComponent ,pathMatch: 'full'},

  { path: 'myprofile/:username/editProfile', component: ProfileComponent },
  { path: 'myposts', redirectTo: 'myposts/allpost', pathMatch: 'full' },
  { path: 'myposts/:type', component: UserPostComponent,pathMatch: 'full'  },


  {path: '**/undefined', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled',useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
