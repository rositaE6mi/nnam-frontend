import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-agriculteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-agriculteur.component.html',
})
export class LoginAgriculteurComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const type = this.authService.getUserType();
    if (type === 'agriculteur') this.router.navigate(['/agriculteur']);
    if (type === 'client') this.router.navigate(['/client']);
  }

  login(): void {
    const stored = localStorage.getItem('agriculteur');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === this.credentials.email && user.password === this.credentials.password) {
        this.authService.setUserType('agriculteur');
        this.router.navigate(['/agriculteur']);
        return;
      }
    }
    this.errorMessage = 'Email ou mot de passe invalide.';
  }
}
