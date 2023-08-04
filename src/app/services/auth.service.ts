import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private JWT: JwtHelperService, private router: Router) {}
  login(data): Observable<any> {
    return this.http.post(environment.API_URL + '/auth/login', data).pipe(
      map((result: any) => {
        localStorage.setItem('access_token', result.access_token);
        return true;
      })
    );
  }
  isSignedIn(): boolean{
    const token= localStorage.getItem('access_token')
    if(!token){
      return false
    }
    return true
  }
  logOut(){
    localStorage.removeItem('access_token')
    this.router.navigate(['login'])
  }
}
