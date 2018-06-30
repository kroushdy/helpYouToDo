import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import {User} from '../models/users';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    if(this.userService.tempUser != null)
    {
    this.userService.tempUser = this.prepareSaveUser();
    this.userService.addUser(this.userService.tempUser);
    this.userService.tempUser=undefined;

    }
  }

  showProfile()
  {
    var iuser = firebase.auth().currentUser;
    //console.log("Let us see : "+iuser.uid);
    this.router.navigateByUrl('/user-profile/'+this.userService.userKey);
  }



  prepareSaveUser(): User {

    console.log("PLEASE BE RIGHT : "+this.userService.userKey);

    const saveUser: User = {

      id: this.userService.userKey,
      username: this.userService.tempUser.username,
      email: this.userService.tempUser.email ,
      password: this.userService.tempUser.password ,
      favcoffee: this.userService.tempUser.favcoffee ,
      
    };
    return saveUser;
  }


  logout() {
    this.userService.logout();
  }


}
