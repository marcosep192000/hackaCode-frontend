import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../models/entity/game';
import { GameEmployee } from '../models/entity/game-employee';

@Injectable({
  providedIn: 'root'
})
export class GameEmployeeService {
  expURL = "http://localhost:8080/api/v1/game-employee/";
expURL2 ="http://localhost:8080/api/v1/auth/";
expURL3 = "http://localhost:8080/api/v1/employees/";
 
  constructor(private httpClient: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
  }
  public all(): Observable<GameEmployee[]> {
    return this.httpClient.get<GameEmployee[]>(this.expURL + 'getAll');
  }

  public save(game: GameEmployee): Observable<any> {
    return this.httpClient.post(this.expURL2 + 'register', game);
  }

  public update(id: number, customer: Game): Observable<any> {
    return this.httpClient.put(this.expURL + `update/${id}`, customer);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.expURL3 + `delete/${id}`);
  }
  public findId(id: number): Observable<any> {
    return this.httpClient.get<Game>(this.expURL + `find/${id}`)
  }
}
