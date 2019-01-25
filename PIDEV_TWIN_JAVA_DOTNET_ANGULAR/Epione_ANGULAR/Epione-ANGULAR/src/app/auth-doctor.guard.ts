import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDoctorGuard implements CanActivate {

  constructor(private serviceUser : UserService , private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if((localStorage.getItem('role')=="doctor")&&(localStorage.getItem('loggedIn')=="true"))
      {
        return true ; 
      }
      else {
        this.route.navigate(['guest/loginDoctor']) ;
      }
      return false ;
  }
}
