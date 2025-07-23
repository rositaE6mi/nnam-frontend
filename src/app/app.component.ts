import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterModalComponent } from "./components/register-modal/register-modal.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nnam-frontend';

  constructor(private authService: AuthService, private router: Router) {}

 ngOnInit() {
  const publicRoutes = [
    '/forgot-password',
    '/reset-password',
    '/register-client',
    '/register-agriculteur',
    '/login-client',
    '/login-agriculteur',
    '/login-admin'
  ];

  const currentUrl = this.router.url;

  // Si la route est publique, ne redirige pas
  if (publicRoutes.includes(currentUrl)) {
    console.log('Page publique, pas de redirection');
    return;
  }

  const type = this.authService.getUserType();
  if (type === 'CLIENT') {
    this.router.navigate(['/client']);
  } else if (type === 'AGRICULTEUR') {
    this.router.navigate(['/agriculteur']);
  }

  console.log('HomeComponent loaded');
}
}

