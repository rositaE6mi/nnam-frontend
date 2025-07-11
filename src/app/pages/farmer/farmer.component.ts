// pages/farmer/farmer.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent {
  produits: any[] = [];
  nextId = 1;

  nouveauProduit = {
    nom: '',
    prix: 0,
    stock: 0,
    categorie: 'tubercules'
  };

  ajouterProduit(): void {
    const produitAjoute = {
      id: this.nextId++,
      ...this.nouveauProduit
    };
    this.produits.push(produitAjoute);
    this.nouveauProduit = {
      nom: '', prix: 0, stock: 0, categorie: 'tubercules'
    };
  }

  supprimerProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produits = this.produits.filter(p => p.id !== id);
    }
  }

  modifierProduit(id: number): void {
    alert(`Édition du produit ${id} — Fonctionnalité à venir`);
  }
}
