import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router'; // Importe Router correctement

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'] // Assure-toi d'utiliser styleUrls au lieu de styleUrl
})
export class LoginAdminComponent {
  email: string = '';
  motDePasse: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
}