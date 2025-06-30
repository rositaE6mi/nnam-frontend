import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { Produit } from '../../core/models/produit.model';
import { PanierService } from '../../core/services/panier.service';
import { CategorieService } from '../../core/services/categorie.service';
import { Categorie } from '../../core/models/categorie.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  filtreNom = '';
  filtreCategorie = '';
  filtrePrix = 0;
  totalMontant: number = 0;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
    
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data) => {
        this.produits = data.filter(p => p.stock.quantiteStock > 0);
      },
      error: (err) => console.error(err)
    });
  }

  chargerCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error(err)
    });
  }

  ajouterAuPanier(produit: Produit, qte: number = 1): void {
    this.panierService.ajouterProduit(produit.idProduit, qte);
    alert(`${qte} article(s) ajouté(s) au panier`);
  }

  getProduitsFiltres(): Produit[] {
    return this.produits.filter(p => {
      const correspondNom = this.filtreNom === '' || p.nomProduit.toLowerCase().includes(this.filtreNom.toLowerCase());
      const correspondCat = this.filtreCategorie === '' || p.categorieId.toString() === this.filtreCategorie;
      const correspondPrix = this.filtrePrix === 0 || p.prixU <= this.filtrePrix;
      return correspondNom && correspondCat && correspondPrix;
    });
  }
}