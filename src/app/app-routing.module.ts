import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in/sign-in.component";
import { UserHomepageComponent } from "./user-homepage/user-homepage.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'user-homepage', component: UserHomepageComponent , canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent , canActivate: [AuthGuard] },
  { path: 'user-profile/:id', component: UserProfileComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule { 

}
