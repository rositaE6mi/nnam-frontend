import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { Produit } from '../../core/models/produit.model';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  produits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error(err)
    });
  }

  modifierProduit(id: number) {
    this.router.navigate(['/modifier-produit', id]);
  }

  supprimerProduit(id: number) {
    if (confirm("Confirmer la suppression ?")) {
      this.produitService.supprimerProduit(id).subscribe({
        next: () => this.produitService.getAllProduits().subscribe({
          next: (data) => this.produits = data,
          error: (err) => console.error(err)
        }),
        error: (err) => console.error(err)
      });
    }
  }
}