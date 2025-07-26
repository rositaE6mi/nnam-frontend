import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { Produit } from '../../core/models/produit.model';
import { CategorieService } from '../../core/services/categorie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  query: string = '';
  resultats: Produit[] = [];
  rienTrouve: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = (params['q'] || '').trim().toLowerCase();
      if (this.query) {
        this.rechercher(this.query);
      }
    });
  }

  rechercher(query: string): void {
    this.produitService.getAllProduits().subscribe({
      next: (produits: Produit[]) => {
        const res = produits.filter(p =>
          p.nomProduit.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
        );

        if (res.length > 0) {
          this.resultats = res;
          this.rienTrouve = false;
        } else {
          this.rechercherDansCategorie(query);
        }
      },
      error: () => this.rienTrouve = true
    });
  }

rechercherDansCategorie(query: string): void {
  this.categorieService.getAllCategories().subscribe({
    next: (categories) => {
      const categorie = categories.find(c =>
        c.nomCat.toLowerCase().includes(query)
      );

      if (categorie && Array.isArray(categorie.produits) && categorie.produits.length > 0) {
        this.resultats = categorie.produits;
        this.rienTrouve = false;
      } else {
        this.resultats = [];
        this.rienTrouve = true;
      }
    },
    error: () => {
      this.resultats = [];
      this.rienTrouve = true;
    }
  });
}


  goToDetail(id: number): void {
    window.location.href = `/produit/${id}`;
  }
}
