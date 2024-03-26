import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private router:Router, private userService:UserService, private notificationService:NotificationService) { }

  login(username:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`, 
    {
      username,
      password
    }).pipe(switchMap((res:any)=>{
      this.setToken(res.token)
      return this.userService.getBootstrapData()
    }))
  }

  signup(data:any){
    return this.http.post(`${environment.apiUrl}/users`, data)
  }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    const currentUser = this.userService.currentUserSubject.value;
    // unsubscribe from pusher channel
    this.notificationService.unsubscribeChannel(currentUser!.id);
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
