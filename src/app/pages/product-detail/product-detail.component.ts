import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  quantity = 1;
  message = '';
  product: Produit | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private panierService: PanierService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getProduitById(this.productId).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error(err)
    });
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product?.stock.quantiteStock || 0)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCartFromDetail(): void {
    if (this.product) {
      this.panierService.ajouterProduit(this.product.idProduit, this.quantity);
      this.message = `${this.quantity} kg ajouté(s) au panier ✅`;

      setTimeout(() => {
        this.message = '';
        this.router.navigate(['/panier']);
      }, 1500);
    }
  }
}