// pages/panier/panier.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../core/services/panier.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  produits: { id: number; nom: string; prix: number; quantite: number }[] = [];

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    const produitsIds: number[] = this.panierService.getProduits();

    const produitsCatalogue: Record<number, { nom: string; prix: number }> = {
      1: { nom: 'Carottes Bio', prix: 2500 },
      2: { nom: 'Maïs Local', prix: 1800 },
      3: { nom: 'Tomates Fraîches', prix: 3000 },
      4: { nom: 'Piment Rouge', prix: 5000 }
    };

    for (const id of produitsIds) {
      const produit = produitsCatalogue[id];
      if (!produit) continue;

      const existant = this.produits.find(p => p.id === id);
      if (existant) {
        existant.quantite++;
      } else {
        this.produits.push({
          id,
          nom: produit.nom,
          prix: produit.prix,
          quantite: 1
        });
      }
    }
  }

  calculerTotal(): number {
    return this.produits.reduce((total, p) => total + p.prix * p.quantite, 0);
  }

  supprimer(index: number): void {
    const produitSupprime = this.produits[index];
    this.panierService.retirerProduit(produitSupprime.id, produitSupprime.quantite);
    this.produits.splice(index, 1);
  }

  validerCommande(): void {
    alert('Commande validée avec succès !');
    this.panierService.viderPanier();
    this.produits = [];
  }
}
