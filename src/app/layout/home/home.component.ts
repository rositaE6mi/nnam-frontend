import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;

  slides = [
    { image: 'assets/images/f8b8f482998c84df91b8c042b87d462c.jpg', title: 'Produits Frais du Terroir', subtitle: 'Directement de nos agriculteurs locaux' },
    { image: 'assets/images/f46802e2a877217435cd4cab4b4121f3.jpg', title: 'Précommandes Disponibles', subtitle: 'Réservez vos produits de saison' },
    { image: 'assets/images/82de9bf35813c1916c0ab4498a3616fd.jpg', title: 'Agriculture Durable', subtitle: 'Soutenons l\'agriculture responsable' },
    { image: 'assets/images/8d4331f384ad7699ff511251bd0c11e2.jpg', title: 'Livraison Rapide', subtitle: 'De la ferme à votre table en 24h' }
  ];

  produits = [
    {
      id: 1,
      nom: 'Produit 1',
      description: 'Description du produit 1',
      prix: 2500,
      imageUrl: 'assets/images/6b2f7bd43b9c6800c1e6ac412a09591e.jpg'
    },
    {
      id: 2,
      nom: 'Produit 2',
      description: 'Description du produit 2',
      prix: 1800,
      imageUrl: 'assets/images/4fce9e4816de5eb6ac1d70f7c66951e2.jpg'
    },
    {
      id: 3,
      nom: 'Produit 3',
      description: 'Description du produit 3',
      prix: 3000,
      imageUrl: 'assets/images/9c196a8e9274c35017aff9c7e57d0c2c.jpg'
    },
    {
      id: 4,
      nom: 'Produit 4',
      description: 'Description du produit 4',
      prix: 5000,
      imageUrl: 'assets/images/10fb8377d7a30d01ad3c87d67381042a.jpg'
    }
  ];

  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  addToCart(event: Event, id: number): void {
    event.stopPropagation();
    this.panierService.ajouterProduit(id);
    this.router.navigate(['/panier']);
  }

  showProductDetail(productId: number): void {
    this.router.navigate(['/produit', productId]);
  }

  onImageError(event: any, produit: any): void {
    console.log(`Erreur de chargement de l'image pour ${produit.nom}`);
    produit.imageUrl = null;
  }
}
