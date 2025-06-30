import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../../core/models/produit.model';
import { Categorie } from '../../core/models/categorie.model';
import { ProduitService } from '../../core/services/produit.service';
import { CategorieService } from '../../core/services/categorie.service';
import { AuthService } from '../../core/services/auth.service';
import { ProduitReqDTO } from '../../core/models/produit-req-dto.model';

@Component({ 
  selector: 'app-gestion-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css'] 
})
export class GestionProduitsComponent implements OnInit {

  produits: Produit[] = []; 
  categories: Categorie[] = []; 


  // Formulaire d'ajout
  nouveauProduit: Produit = {
    idProduit: 0,
    nomProduit: '',
    description: '',
    prixU: 0,
    dateExpiration: '',
    categorieId: 0,
    stock: {
      nom: 'Stock principal',
      quantiteStock: 0
    }
  };


  // Formulaire de modification
  isEditing = false;
  produitEnCours: Produit = {
    idProduit: 0,
    nomProduit: '',
    description: '',
    prixU: 0,
    dateExpiration: '',
    categorieId: 0,
    stock: {
      nom: 'Stock principal',
      quantiteStock: 0
    }
  };


  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    if (!this.authService.isAdminOrAgriculteur()) {
      alert("Accès refusé.");
      this.router.navigate(['/']);
      return;
    }

    this.chargerProduits();
    this.chargerCategories();
  }

  chargerProduits(){
    this.produitService.getAllProduits().subscribe(
      data => this.produits = data,
      error => console.error(error)
    );
  }

  chargerCategories(){
    this.categorieService.getAllCategories().subscribe(
      data => this.categories = data,
      error => console.error(error)
    );
  }

  lancerModification(produit: Produit) {
    this.isEditing = true;

    // Cloner l'objet afin d'éviter que le binding soit lié
    this.produitEnCours = { 
      idProduit: produit.idProduit,
      nomProduit: produit.nomProduit,
      description: produit.description,
      prixU: produit.prixU,
      dateExpiration: produit.dateExpiration,
      categorieId: produit.categorieId,
      stock: {
        nom: produit.stock.nom,
        quantiteStock: produit.stock.quantiteStock
      }
    };
  }

  sauvegarderProduit(){
    this.produitService.modifierProduit(this.produitEnCours).subscribe(
      () => {
        alert("Produit modifié avec succès!");
        this.chargerProduits();
        this.isEditing = false;
        this.resetEditForm();
      },
      error => console.error(error)
    )
  }

  annulerModification(){
    this.isEditing = false;
    this.resetEditForm();
  }

  resetEditForm(){
    this.produitEnCours = {
      idProduit: 0,
      nomProduit: '',
      description: '',
      prixU: 0,
      dateExpiration: '',
      categorieId: 0,
      stock: {
        nom: 'Stock principal',
        quantiteStock: 0
      }
    };
  }
ajouterProduit(){
  // Construire le DTO depuis le formulaire
  const produit: Produit = {
    nomProduit: this.nouveauProduit.nomProduit,
    description: this.nouveauProduit.description,
    prixU: Number(this.nouveauProduit.prixU),
    dateExpiration: this.nouveauProduit.dateExpiration,
    categorieId: Number(this.nouveauProduit.categorieId), // <- Correction
    stock: {
      nom: 'Stock principal',
      quantiteStock: Number(this.nouveauProduit.stock.quantiteStock)
    },
    idProduit: 0
  };

  this.produitService.ajouterProduit(produit).subscribe(
    () => {
      alert("Produit ajouté avec succès!");
      this.chargerProduits();
      this.resetAddForm();
    },
    error => console.error(error)
  )
}




  resetAddForm(){
    this.nouveauProduit = {
      idProduit: 0,
      nomProduit: '',
      description: '',
      prixU: 0,
      dateExpiration: '',
      categorieId: 0,
      stock: {
        nom: 'Stock principal',
        quantiteStock: 0
      }
    };
  }

  supprimerProduit(idProduit: number){
    if (confirm("Êtes-vous sûr ?")) {
      this.produitService.supprimerProduit(idProduit).subscribe(
        () => this.chargerProduits()
      )
    }
  }

}

