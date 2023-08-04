import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  header
  options

  constructor(private jwt: JwtHelperService) { 
    this.header = new HttpHeaders({ "method": "post", "Authorization": 'Bearer '+ this.getToken() });
    this.options = { headers: this.header };
  }
  isAuthenticated(){
    if (localStorage.getItem('access_token')){
      return true
    }
    return false
  }
  getToken(){
    return localStorage.getItem('access_token')
  }
  getTokenPayload(){
    return this.jwt.decodeToken(this.getToken())
  }
}

