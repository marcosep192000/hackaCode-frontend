import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../login/token.service';
import { LoginUser } from '../../login/login-user';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanLoad {
  
  constructor(private authService : TokenService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
  
      

     const allowedRoles = route.data?.['allowedRoles']
     
    const role = this.authService.getRole() ;
     console.log("este es mi rol   " +role + " este es mi rol") 
    if (role == allowedRoles) {
    return true;
    }
    return false; 
    
 // }
    }
  }

