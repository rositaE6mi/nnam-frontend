import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Client } from '../../core/models/user-register.model';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {
  client: Client = {
    nomUtilisateur: '',
    prenomUtilisateur: '',
    dateNaissance: '',
    lieuNaissance: '',
    villeActuelle: '',
    quartier: '',
    boitePostale: '',
    email: '',
    motDePasse: '',
    role: 'CLIENT',
    adresseLivraison: ''
  };

  message = '';
  isSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.message = '';
    this.isSuccess = false;

    // Validation simple
    if (
      !this.client.nomUtilisateur ||
      !this.client.prenomUtilisateur ||
      !this.client.dateNaissance ||
      !this.client.lieuNaissance ||
      !this.client.villeActuelle ||
      !this.client.quartier ||
      !this.client.boitePostale ||
      !this.client.email ||
      !this.client.motDePasse ||
      !this.client.adresseLivraison
    ) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    // Appel API via AuthService
    this.authService.registerClient(this.client).subscribe({
      next: () => {
        this.isSuccess = true;
        this.message = 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.';
        // Optionnel : rediriger après un délai (ex: 3s)
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.message = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }
    });

    // --- Si pas d'API, utiliser stockage local (commenté) ---
    /*
    localStorage.setItem('client', JSON.stringify(this.client));
    this.authService.setUserType('CLIENT');
    this.message = 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
    */
  }
}
