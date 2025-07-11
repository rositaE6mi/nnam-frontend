import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Agriculteur } from '../../core/models/user-register.model';

@Component({
  selector: 'app-register-agriculteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-agriculteur.component.html',
  styleUrls: ['./register-agriculteur.component.css']
})
export class RegisterAgriculteurComponent {
  agriculteur: Agriculteur = {
    nomUtilisateur: '',
    prenomUtilisateur: '',
    dateNaissance: '',
    lieuNaissance: '',
    villeActuelle: '',
    quartier: '',
    boitePostale: '',
    email: '',
    motDePasse: '',
    role: 'AGRICULTEUR',
    localisationFerme: '',
    superficie: 0,
    cultures: ''
  };

  message = '';
  isSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

register(): void {
  this.message = '';
  this.isSuccess = false;

  if (
    !this.agriculteur.nomUtilisateur ||
    !this.agriculteur.prenomUtilisateur ||
    !this.agriculteur.dateNaissance ||
    !this.agriculteur.lieuNaissance ||
    !this.agriculteur.villeActuelle ||
    !this.agriculteur.quartier ||
    !this.agriculteur.boitePostale ||
    !this.agriculteur.email ||
    !this.agriculteur.motDePasse ||
    !this.agriculteur.localisationFerme ||
    !this.agriculteur.superficie ||
    !this.agriculteur.cultures
  ) {
    this.message = 'Veuillez remplir tous les champs.';
    return;
  }

  this.authService.registerAgriculteur(this.agriculteur).subscribe({
    next: () => {
      this.isSuccess = true;
      this.message = 'Votre compte a été créé avec succès ! Vous allez être redirigé.';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    },
    error: (err) => {
      console.error(err);

      // Vérifie si l’erreur contient un message indiquant que l’email existe déjà
      if (err.error && err.error.message && err.error.message.includes('existe déjà')) {
        this.message = "Cet email est déjà utilisé. Veuillez en saisir un autre.";
      } else {
        this.message = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }

      this.isSuccess = false;
    }
  });



    // --- Si pas d'API, stockage local (commenté) ---
    /*
    localStorage.setItem('agriculteur', JSON.stringify(this.agriculteur));
    this.authService.setUserType('AGRICULTEUR');
    this.message = 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
    */
  }
}
