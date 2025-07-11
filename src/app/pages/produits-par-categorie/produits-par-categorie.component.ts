import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';
import { CategorieService } from '../../core/services/categorie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produits-par-categorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produits-par-categorie.component.html',
  styleUrls: ['./produits-par-categorie.component.css']
})
export class ProduitsParCategorieComponent implements OnInit {
  nomCategorie = '';
  produits: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private panierService: PanierService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.nomCategorie = this.route.snapshot.paramMap.get('nom')?.toLowerCase() || '';

    this.categorieService.getCategorieByNom(this.nomCategorie).subscribe({
      next: (categorie) => {
        this.produits = (categorie.produits || []).map((p: any) => ({
          id: p.idProduit,
          nom: p.nomProduit,
          description: p.description,
          prix: p.prixU,
          icon: this.getIcon(p.nomProduit),
          bgClass: this.getColor(p.nomProduit)
        }));
      },
      error: () => {
        this.produits = [];
      }
    });
  }

  ajouterAuPanier(id: number): void {
    this.panierService.ajouterProduit(id);
    alert('Produit ajouté au panier !');
  }

  getIcon(nom: string): string {
    const lower = nom.toLowerCase();
    if (lower.includes('pommes')) return 'fa-apple-alt';
    if (lower.includes('manioc')) return 'fa-seedling';
    if (lower.includes('oranges')) return 'fa-lemon';
    if (lower.includes('patate')) return 'fa-carrot';
    return 'fa-box';
  }

  getColor(nom: string): string {
    const lower = nom.toLowerCase();
    if (lower.includes('pommes')) return 'from-red-500 to-red-700';
    if (lower.includes('manioc')) return 'from-yellow-500 to-yellow-700';
    if (lower.includes('oranges')) return 'from-orange-400 to-orange-600';
    if (lower.includes('patate')) return 'from-purple-400 to-purple-600';
    return 'from-gray-400 to-gray-600';
  }
}
