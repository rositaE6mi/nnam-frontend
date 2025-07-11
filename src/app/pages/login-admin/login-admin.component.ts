import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  email: string = '';
  motDePasse: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.loginAdmin(this.email, this.motDePasse).subscribe(
      (response: any) => {
        localStorage.setItem('userType', 'admin');
        this.router.navigate(['/admin-dashboard']);
      },
      (error: any) => {
        alert('Identifiants incorrects');
      }
    );
  }

  motDePasseOublie(): void {
    // TODO: Implémente la logique de redirection ou ouverture de modale ici
    alert('Redirection vers la page de réinitialisation de mot de passe');
    // Exemple si tu as déjà une route dédiée :
    // this.router.navigate(['/reset-password']);
  }
}
