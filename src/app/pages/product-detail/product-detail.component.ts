import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../core/services/panier.service';
import { ProduitService } from '../../core/services/produit.service';
import { Produit } from '../../core/models/produit.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product?: Produit;
  quantity = 1;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getProduitById(this.productId).subscribe({
      next: data => this.product = data,
      error: err => console.error(err)
    });
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product?.stock?.quantiteStock || 0)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCartFromDetail(): void {
    if (!this.product) return;
    this.panierService.ajouterProduit(this.product.idProduit, this.quantity);
    this.message = `${this.quantity} kg ajouté(s) au panier`;
    setTimeout(() => this.router.navigate(['/panier']), 1200);
  }

  addToFavorites(): void {
    // Implémenter la logique de favoris (stockée localement, service, etc.)
    alert(`Produit "${this.product?.nomProduit}" ajouté aux favoris 💚`);
  }

  goBack(): void {
    this.router.navigate(['/agriculteur']); // ou : this.router.navigate(['../'], { relativeTo: this.route });
  }

  goNext(): void {
    // par exemple +1 en id
    this.router.navigate(['/product-detail', this.productId + 1]);
  }
}
