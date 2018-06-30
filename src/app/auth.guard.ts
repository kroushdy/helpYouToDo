import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService} from './user.service';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
  ): Observable<boolean> | boolean {
    if (this.userService.authenticated) {
      console.log('access here allowed!')
      return true; }

  
    console.log('access denied!')
    this.router.navigate(['/sign-in']);
    return false;
  


}
}
