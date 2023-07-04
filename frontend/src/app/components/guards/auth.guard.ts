import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { TokenService } from '../login/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router: Router,  private authService: TokenService){}
 
 
  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ): boolean { const currentUser = this.authService.getUserName;
    if (currentUser()){
     return true;
    }
    this.router.navigate(['/login'],{
      queryParams:{returnUrl:state.url} 
    });
  return false;
  }
  
  
}
