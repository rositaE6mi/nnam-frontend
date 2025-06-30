import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../core/models/categorie.model';
import { Produit } from '../../core/models/produit.model';
import { CategorieService } from '../../core/services/categorie.service';
import { ProduitService } from '../../core/services/produit.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ 
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] 
})
export class AdminDashboardComponent implements OnInit {

  // Categories
  categories: Categorie[] = [];  
  isEditing = false;
  nouvelleCategorie: Categorie = {
    idCat: 0,
    nomCat: '',
    description: '',
    produits: []
  };
  
  // Produits
  produits: Produit[] = []; 
  isEditingProduit = false;
  nouveauProduit: Produit = {
    idProduit: 0,
    nomProduit: '',
    description: '',
    prixU: 0,
    dateExpiration: '', // Assurez-vous que le format est correct
    categorieId: 0,
    stock: {
      nom: '',
      quantiteStock: 0
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private categorieService: CategorieService,
    private produitService: ProduitService
  ){}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      alert("Accès refusé.");
      this.router.navigate(['/']);
      return;
    }
    this.chargerCategories();
    this.chargerProduits();
  }

  // Gestion des Catégories
  chargerCategories(){
    this.categorieService.getAllCategories().subscribe((data) => this.categories = data);
  }

  commencerEdition(idCat: number) {
    const cat = this.categories.find((c) => c.idCat === idCat);
    if (cat) {
      this.isEditing = true;
      this.nouvelleCategorie = { ...cat };
    }
  }

  sauvegarderCategorie(){
    if (this.isEditing) {
      this.categorieService.modifierCategorie(this.nouvelleCategorie).subscribe((res) => {
        alert("Catégorie modifiée.");
        this.chargerCategories();
        this.isEditing = false;
        this.nouvelleCategorie = { idCat: 0, nomCat: '', description: '', produits: [] };
      }, (err) => console.error(err));
    } else {
      this.categorieService.ajouterCategorie(this.nouvelleCategorie).subscribe((res) => {
        alert("Catégorie ajoutée.");
        this.chargerCategories();
        this.nouvelleCategorie = { idCat: 0, nomCat: '', description: '', produits: [] };
      }, (err) => console.error(err));
    }
  }

  annuler(){
    this.isEditing = false;
    this.nouvelleCategorie = { idCat: 0, nomCat: '', description: '', produits: [] };
  }

  supprimer(idCat: number) {
    if (confirm("Êtes-vous sûr ? Cette opération est irréversible.")) {
      this.categorieService.supprimerCategorie(idCat).subscribe((res) => {
        alert("Catégorie supprimée.");
        this.chargerCategories();
      }, (err) => console.error(err));
    }
  }

  // Gestion des Produits
  chargerProduits(){
    this.produitService.getAllProduits().subscribe((data) => this.produits = data);
  }

  commencerEditionProduit(idProduit: number) {
    const produit = this.produits.find((p) => p.idProduit === idProduit);
    if (produit) {
      this.isEditingProduit = true;
      this.nouveauProduit = { ...produit };
    }
  }

  sauvegarderProduit() {
    if (this.isEditingProduit) {
      this.produitService.modifierProduit(this.nouveauProduit).subscribe((res) => {
        alert("Produit modifié.");
        this.chargerProduits();
        this.isEditingProduit = false;
        this.nouveauProduit = { idProduit: 0, nomProduit: '', description: '', prixU: 0, dateExpiration: '', categorieId: 0, stock: { nom: '', quantiteStock: 0 } }; // Réinitialisez le produit
      }, (err) => console.error(err));
    } else {
      this.produitService.ajouterProduit(this.nouveauProduit).subscribe((res) => {
        alert("Produit ajouté.");
        this.chargerProduits();
        this.nouveauProduit = { idProduit: 0, nomProduit: '', description: '', prixU: 0, dateExpiration: '', categorieId: 0, stock: { nom: '', quantiteStock: 0 } }; // Réinitialisez le produit
      }, (err) => console.error(err));
    }
  }

  annulerProduit() {
    this.isEditingProduit = false;
    this.nouveauProduit = { idProduit: 0, nomProduit: '', description: '', prixU: 0, dateExpiration: '', categorieId: 0, stock: { nom: '', quantiteStock: 0 } }; // Réinitialisez le produit
  }

  supprimerProduit(idProduit: number) {
    if (confirm("Êtes-vous sûr ? Cette opération est irréversible.")) {
      this.produitService.supprimerProduit(idProduit).subscribe((res) => {
        alert("Produit supprimé.");
        this.chargerProduits();
      }, (err) => console.error(err));
    }
  }
}
