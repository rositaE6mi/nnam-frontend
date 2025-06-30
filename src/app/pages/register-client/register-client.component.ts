import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterClient } from '../../core/models/user-register.model';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-client.component.html'
})
export class RegisterClientComponent {
  client: RegisterClient = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    adresseLivraison: ''
  };

  confirmPassword = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
  localStorage.setItem('client', JSON.stringify(this.client));
  this.authService.setUserType('client');
  this.router.navigate(['/client']);
}

}
