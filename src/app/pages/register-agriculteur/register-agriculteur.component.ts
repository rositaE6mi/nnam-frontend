import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterAgriculteur } from '../../core/models/user-register.model';

@Component({
  selector: 'app-register-agriculteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-agriculteur.component.html',
  styleUrls: ['./register-agriculteur.component.css']
})
export class RegisterAgriculteurComponent {
  agriculteur: RegisterAgriculteur = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    localisationFerme: '',
    superficie: 0,
    cultures: ''
  };

  message = '';

  constructor(private authService: AuthService, private router: Router) {}

 register(): void {
  localStorage.setItem('agriculteur', JSON.stringify(this.agriculteur));
  this.authService.setUserType('agriculteur');
  this.router.navigate(['/agriculteur']);
}

}
