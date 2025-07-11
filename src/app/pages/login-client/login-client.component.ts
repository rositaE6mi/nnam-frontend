import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-client.component.html',
})
export class LoginClientComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const type = this.authService.getUserType();
    if (type === 'CLIENT') this.router.navigate(['/client']);
    if (type === 'AGRICULTEUR') this.router.navigate(['/agriculteur']);
    if (type === 'ADMIN') this.router.navigate(['/admin-dashboard']);
  }

  login(): void {
    const stored = localStorage.getItem('client');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === this.credentials.email && user.password === this.credentials.password) {
        this.authService.setUserType('CLIENT');
        this.router.navigate(['/client']);
        return;
      }
    }
    this.errorMessage = 'Email ou mot de passe invalide.';
  }
}
