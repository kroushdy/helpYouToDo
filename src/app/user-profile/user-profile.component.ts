import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument  } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userprofile: any;

  constructor(private route: ActivatedRoute,
              public fs:AngularFirestore) { }

  ngOnInit() {
    //this.route.params.subscribe(params => {
      //this.post = this.db.object('/posts/' + params['postId'])
 //  });
  }

}
