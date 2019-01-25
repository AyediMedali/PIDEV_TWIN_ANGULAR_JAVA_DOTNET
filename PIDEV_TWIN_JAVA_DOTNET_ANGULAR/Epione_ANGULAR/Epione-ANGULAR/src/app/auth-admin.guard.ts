import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private serviceUser : UserService , private route :Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if((localStorage.getItem('role')=="admin")&&(localStorage.getItem('loggedIn')=="true"))
      {
        return true ; 
      }
      else {
        this.route.navigate(['guest/loginAdmin']) ;
      }
      return false ;

    //return (localStorage.getItem('role')=="admin")&&(localStorage.getItem('loggedIn')=="true");
  }
}
