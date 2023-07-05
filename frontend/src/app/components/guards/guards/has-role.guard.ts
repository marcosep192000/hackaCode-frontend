import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../login/token.service';
import { LoginUser } from '../../login/login-user';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanLoad,CanActivate {
  
  constructor(private tokenService : TokenService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.hasRole(route);
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.hasRole(route);
   
    
  
 // 
    }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const role = route.data?.['role'];
    console.log(this.tokenService.getRole());

    return role.includes(this.tokenService.getRole());
  }
  }

