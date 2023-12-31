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
 
  constructor(private httpClient : HttpClient) { }


//public nuevo(nuevoUsuario : NuevoUsuario): Observable<any>{
  //return this.httpClient.post<any>(this.authURL +'nuevo',nuevoUsuario);

//}

  public login(loginUsuario: LoginUser): Observable<JwtDto>{
   //  console.log(loginUsuario)
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
    
}

}