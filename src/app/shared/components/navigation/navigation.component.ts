import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isSidebarVisible = false;
  currentUser: User | null = null;
  
	constructor(public authService: AuthenticationService, private userService:UserService) {
    this.userService.currentUserSubject.subscribe((user) => {
      console.log(user, 'user');
      this.currentUser = user;
    });
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    if(this.isSidebarVisible){
      this.toggleSidebar();
    }

    this.authService.logout();
    this.userService.setCurrentUser(null);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
