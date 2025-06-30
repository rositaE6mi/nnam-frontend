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
    {
      image: 'assets/images/agri1.jpg',
      title: 'Produits Frais du Terroir',
      subtitle: 'Directement de nos agriculteurs locaux'
    },
    {
      image: 'assets/images/agri2.jpg',
      title: 'Précommandes Disponibles',
      subtitle: 'Réservez vos produits de saison'
    },
    {
      image: 'assets/images/agri3.jpg',
      title: 'Agriculture Durable',
      subtitle: 'Soutenons l\'agriculture responsable'
    },
    {
      image: 'assets/images/slide4.jpg',
      title: 'Livraison Rapide',
      subtitle: 'De la ferme à votre table en 24h'
    }
  ];

  produits = [
    {
      id: 1,
      nom: 'Carottes Bio',
      description: 'Carottes fraîches cultivées sans pesticides',
      prix: 2500,
      icon: 'fa-carrot',
      bgClass: 'from-green-400 to-green-600',
      imageUrl: null // null = affiche l'icône par défaut
    },
    {
      id: 2,
      nom: 'Maïs Local',
      description: 'Maïs de première qualité, séché naturellement',
      prix: 1800,
      icon: 'fa-seedling',
      bgClass: 'from-yellow-400 to-yellow-600',
      imageUrl: null // null = affiche l'icône par défaut
    },
    {
      id: 3,
      nom: 'Tomates Fraîches',
      description: 'Tomates juteuses, parfaites pour vos salades',
      prix: 3000,
      icon: 'fa-apple-alt',
      bgClass: 'from-red-400 to-red-600',
      imageUrl: null // null = affiche l'icône par défaut
    },
    {
      id: 4,
      nom: 'Piment Rouge',
      description: 'Piment fort pour relever vos plats traditionnels',
      prix: 5000,
      icon: 'fa-pepper-hot',
      bgClass: 'from-purple-400 to-purple-600',
      imageUrl: null // null = affiche l'icône par défaut
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

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  message = '';

  addToCart(event: Event, id: number): void {
    event.stopPropagation();
    this.panierService.ajouterProduit(id);
    this.message = 'Produit ajouté au panier ✅';

    setTimeout(() => {
      this.message = '';
      this.router.navigate(['/panier']);
    }, 1500);
  }

  showProductDetail(productId: number): void {
    this.router.navigate(['/produit', productId]);
  }

  onImageError(event: any, produit: any): void {
    console.log(`Erreur de chargement de l'image pour ${produit.nom}`);
    produit.imageUrl = null;
  }
}
