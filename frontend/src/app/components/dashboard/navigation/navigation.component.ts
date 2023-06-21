import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from '../../login/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLogued = false; 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private tokenService: TokenService,private router:Router) { }
ngOnInit(): void {
   
  if (this.tokenService.getToken()) {
      console.log(this.tokenService.getAuthorities())
      this.isLogued =true;
    }
    else {
      this.isLogued = false;
        this.router.navigate([''])
    }
  }
 onLogout():void{
  this.tokenService.logOut(); 
 }
  
  
  
  
  
}
