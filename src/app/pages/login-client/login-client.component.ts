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
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const type = this.authService.getUserType();
      if (type === 'CLIENT') this.router.navigate(['/client']);
      if (type === 'AGRICULTEUR') this.router.navigate(['/agriculteur']);
      if (type === 'ADMIN') this.router.navigate(['/admin-dashboard']);
    }
  }

 /* login(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
     next: (response) => {
      const role = response.role;
      const user = response.user;
    if (role === 'CLIENT') {
    localStorage.setItem('token', 'dummy-token');
    this.authService.setUserType('CLIENT');
    localStorage.setItem('user', JSON.stringify(user)); // ✅ stocke l’utilisateur
    this.router.navigate(['/client']);
    } else {
    this.errorMessage = 'Cet utilisateur n’est pas un client.';
    }
   },
      error: () => {
        this.errorMessage = 'Email ou mot de passe invalide.';
      }
    });
  }*/

  login(): void {
  this.authService.login(this.credentials.email, this.credentials.password).subscribe({
    next: (role) => {
      if (role === 'CLIENT') {
        this.router.navigate(['/client']);
      } else {
        this.errorMessage = 'Cet utilisateur n’est pas un client.';
      }
    },
    error: () => {
      this.errorMessage = 'Email ou mot de passe invalide.';
    }
  });
}




  motDePasseOublie(): void {
    alert('Redirection vers la page de réinitialisation de mot de passe');
    this.router.navigate(['/forgot-password']);
  }

  allerVersInscription(): void {
    this.router.navigate(['/register-client']);
  }
}
