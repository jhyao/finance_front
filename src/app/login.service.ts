import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpSentEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { config } from './config';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = config.api_url + config.login_url;

  user: User;

  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(this.url, {username: username, password: password});
  }

  getUser(){
    return this.user;
  }


}
