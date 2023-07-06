import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from './jwt-dto';
import { LoginUser } from './login-user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 authURL ="http://localhost:8080/api/v1/auth/"
 // authURL ="149.50.128.108:5002/api/v1/auth/";
  constructor(private httpClient : HttpClient) { }

  public login(loginUsuario: LoginUser): Observable<JwtDto>{
    console.log(JwtDto)
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
    
}

}