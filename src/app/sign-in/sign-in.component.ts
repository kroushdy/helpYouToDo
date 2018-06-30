import { Component,  OnChanges  , Input } from '@angular/core';
import { FormControl , FormGroup , FormBuilder , Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {User} from '../models/users';
import { flatten } from '@angular/compiler';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements  OnChanges  {
  //@Input() user: User;
  user: User 
  //users: User[];
  signupform: FormGroup;
  signinform: FormGroup;
  nameChangeLog: string[] = [];
  sign_in: boolean = false;
  sign_up: boolean = false;



 
  


  constructor(private fb:FormBuilder,
    private userService: UserService,
  ) {
    this.createForm();
    //end of constructor
   }

 createForm() {
    this.signupform= this.fb.group({

      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password:['', Validators.required ],
      favcoffee:'',
     
    });

    this.signinform=this.fb.group({
      email: ['', Validators.required ],
      password:['', Validators.required ]
    });


    //end of create form function
  } 

  ngOnChanges() {
  
  }



 onSubmit() {

  const newformModel = this.signupform.value;
  this.userService.signup(newformModel.email as string , newformModel.password as string);
  this.userService.tempUser = this.prepareSaveUser();
  console.log("Success");
} 

showsignin()
{
  this.sign_in = true;
  this.sign_up = false;
}

showsignup()
{
  this.sign_up = true;
  this.sign_in = false;
}

/*completesignUp()
{

    console.log("PLEASE2"+this.userService.userKey);
    //this.userService.addUser(this.user);

}*/

login() {
  const newsignInformModel = this.signinform.value;
  this.userService.login(newsignInformModel.email as string, newsignInformModel.password as string);
  
  
 
}

logout() {
  this.userService.logout();
}



  prepareSaveUser(): User {
    const newformModel = this.signupform.value;

    //this.userService.signup(newformModel.email as string , newformModel.password as string);
  

  
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveUser: User = {
    
      username: newformModel.username as string,
      email: newformModel.email as string,
      password: newformModel.password as string,
      favcoffee: newformModel.favcoffee as string,

  
    };
    return saveUser;
  }
   /****/


}
