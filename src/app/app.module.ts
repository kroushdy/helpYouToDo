import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireAuthModule} from 'angularfire2/auth'
import { FormsModule , ReactiveFormsModule}   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { UserService }         from './user.service';
import { environment } from '../environments/environment';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { AppRoutingModule }     from './app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard} from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    UserHomepageComponent,
    SignInComponent,
    UserProfileComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,

  ],
  providers: [UserService ,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
