import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilService } from '../../core/services/profil.service';
import { AuthService } from '../../core/services/auth.service';
import { Profil } from '../../core/models/profil.model';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.css']
})
export class ClientProfileComponent implements OnInit {
  profil: Profil | null = null;
  isEditing = false;

  constructor(
    private profilService: ProfilService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Adapte selon ta méthode d'obtention de l'id utilisateur
    if (userId) {
      this.profilService.getProfilByUserId(userId).subscribe({
        next: (data) => this.profil = data,
        error: (err) => console.error(err)
      });
    }
  }

  saveChanges(): void {
    if (this.profil) {
      this.profilService.updateProfil(this.profil).subscribe({
        next: () => {
          alert('Profil mis à jour avec succès');
          this.isEditing = false;
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });
    }
  }

  deleteAccount(): void {
    if (this.profil && confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      this.profilService.deleteProfil(this.profil.idProfil!).subscribe({
        next: () => {
          alert('Compte supprimé');
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression");
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
