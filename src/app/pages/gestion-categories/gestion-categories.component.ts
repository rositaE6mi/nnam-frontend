import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../../core/models/categorie.model';
import { CategorieService } from '../../core/services/categorie.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-gestion-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-categories.component.html',
  styleUrls: ['./gestion-categories.component.css'] 
})
export class GestionCategoriesComponent implements OnInit {

  nouvelleCategorie: Categorie = {
    idCat: 0,
    nomCat: '',
    description: '',
    produits: []
  };
  
  categories: Categorie[] = [];

  isEditing = false;

  constructor(
    private categorieService: CategorieService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    const userType = this.authService.getUserType();
    if (!userType || userType.toLowerCase() !== 'admin') {
      alert("Accès refusé. Vous devez être administrateur.");
      this.router.navigate(['/']);
      return;
    }
    this.chargerCategories();
  }

  chargerCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => {
        console.error("Erreur chargement catégories :", err);
        alert("Erreur lors du chargement des catégories.");
      }
    });
  }

  commencerEdition(idCat: number): void {
    const cat = this.categories.find((c) => c.idCat === idCat);
    if (cat) {
      // Cloner l'objet pour ne pas modifier la liste directement
      this.nouvelleCategorie = { ...cat };
      this.isEditing = true;
    } else {
      alert("Catégorie non trouvée.");
    }
  }

  annulerEdition(): void {
    this.isEditing = false;
    this.nouvelleCategorie = { idCat: 0, nomCat: '', description: '', produits: [] };
  }

  sauvegarderCategorie(): void {
    if (!this.nouvelleCategorie.nomCat.trim()) {
      alert("Le nom de la catégorie est obligatoire.");
      return;
    }

    if (this.isEditing) {
      this.categorieService.modifierCategorie(this.nouvelleCategorie).subscribe({
        next: () => {
          alert('Catégorie modifiée avec succès');
          this.chargerCategories();
          this.annulerEdition();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la modification.");
        }
      });
    } else {
      this.categorieService.ajouterCategorie(this.nouvelleCategorie).subscribe({
        next: () => {
          alert('Catégorie ajoutée avec succès');
          this.chargerCategories();
          this.annulerEdition();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de l'ajout.");
        }
      });
    }
  }

  supprimer(idCat: number): void {
    if (confirm("Êtes-vous sûr ? Cette opération est irréversible.")) {
      this.categorieService.supprimerCategorie(idCat).subscribe({
        next: () => {
          alert("Catégorie supprimée.");
          this.chargerCategories();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression.");
        }
      });
    }
  }
}
