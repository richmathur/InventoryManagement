import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { response } from 'express';
import { catchError, Observable, tap,throwError } from 'rxjs';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'https://localhost:7253/api/auth/login';
  constructor(private http: HttpClient) {}

  currentUser=signal<User|null>(null);
  login(loginData: any): Observable<any> {
    const credentials = { username: loginData.username, password: loginData.password };
    return this.http.post<any>(this.apiUrl, credentials).pipe( 
    tap(response => {          
      if (response && response.token) {
        this.currentUser.set(response);
        localStorage.setItem('token', response.token);       
        console.log('Token saved!');                         
      }
    }),
    catchError(error => { 
      //Handle server crashes or 401 Unauthorized                //tap=> then catch into the pipe
      console.error('Login error:', error);
      return throwError(() => new Error('Something went wrong with the login; please try again.')); // Rethrow the error after logging it
    })                                                     
  );
}
}
