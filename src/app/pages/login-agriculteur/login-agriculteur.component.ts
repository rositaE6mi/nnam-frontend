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
  styleUrls: ['./login-agriculteur.component.css']
})
export class LoginAgriculteurComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const type = this.authService.getUserType();
    if (type === 'AGRICULTEUR') this.router.navigate(['/agriculteur']);
    if (type === 'CLIENT') this.router.navigate(['/client']);
    if (type === 'ADMIN') this.router.navigate(['/admin-dashboard']);
  }

  login(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (role) => {
        if (role === 'ADMIN') {
          this.authService.setUserType('ADMIN');
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'CLIENT') {
          this.authService.setUserType('CLIENT');
          this.router.navigate(['/client']);
        } else if (role === 'AGRICULTEUR') {
          this.authService.setUserType('AGRICULTEUR');
          this.router.navigate(['/agriculteur']);
        } else {
          this.errorMessage = 'Rôle inconnu.';
        }
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe invalide.';
      }
    });
  }

  /*motDePasseOublie(): void {
    alert('Redirection vers la page de réinitialisation du mot de passe');
    // this.router.navigate(['/agriculteur-reset-password']);
  }*/
}
