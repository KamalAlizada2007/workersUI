import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workersUI';
  showNavbar = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        const hideNavbarRoutes = ['/login', '/register'];
        
        const isLoggedIn = this.authService.hasToken();
        const userRole = this.authService.getUserRole();

        this.showNavbar = isLoggedIn && !hideNavbarRoutes.includes(currentUrl);

        console.log('Current:', currentUrl, '| Role:', userRole, '| Show Navbar:', this.showNavbar);
      }
    });
  }
}
