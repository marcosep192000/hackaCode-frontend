import { Injectable } from '@angular/core';
import { JwtDto } from './jwt-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

const helper = new JwtHelperService(); 

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";
const ROLE_KEY="role"; 

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   loggedIn  = new BehaviorSubject<Boolean>(false);


  roles!: string;
  constructor(private httpClient:HttpClient ) {
    this.checkToken();
   }

get isLogged(): Observable<Boolean>{
  return this.loggedIn.asObservable(); 
}


  public setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY)
   localStorage.setItem(TOKEN_KEY,token)
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }
  public setRole(role: string): void {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, role);
  }
  public getRole(): string {
    return localStorage.getItem(AUTHORITIES_KEY)!;
  }

  public logOut():void{
    localStorage.removeItem(TOKEN_KEY)
    this.loggedIn.next(false);
    localStorage.removeItem(AUTHORITIES_KEY)
  }

  private checkToken():void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken); 
    console.log('isExpired=>' ,isExpired);
  if (isExpired){
    this.logOut()
  }else {
    this.loggedIn.next(true)
  }


  }

  public getNameuser() :Boolean{
  if (localStorage.getItem(USERNAME_KEY)!){

    return true; 
  }
    return false  ;
  }

  public setUserName(username: string): void {
   localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUserName(): string {
    return localStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string): void {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));

  }

  public getAuthorities():string{
    this.roles;
    if (sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)!);
    }
    return this.roles;
  }


  

}
