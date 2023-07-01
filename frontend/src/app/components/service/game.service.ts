import { Injectable } from '@angular/core';
import { Game } from '../models/entity/game';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  expURL = "http://localhost:8080/api/v1/games/";
 
  constructor(private httpClient: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
  }

  public all(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.expURL + 'all');
  }

  public save(game: Game): Observable<any> {
    return this.httpClient.post(this.expURL + 'create', game);
  }

  public update(id: number, customer: Game): Observable<any> {
    return this.httpClient.put(this.expURL + `update/${id}`, customer);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.expURL + `delete/${id}`);
  }

  public findId(id: number): Observable<any> {
    return this.httpClient.get<Game>(this.expURL + `find/${id}`)
  }

}
