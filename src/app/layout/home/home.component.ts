import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';
import { ProduitService } from '../../core/services/produit.service';
import { Produit } from '../../core/models/produit.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produits: Produit[]=[];
  currentSlide = 0;

  slides = [
    { image: 'assets/images/f8b8f482998c84df91b8c042b87d462c.jpg', title: 'Produits Frais du Terroir', subtitle: 'Directement de nos agriculteurs locaux' },
    { image: 'assets/images/f46802e2a877217435cd4cab4b4121f3.jpg', title: 'Précommandes Disponibles', subtitle: 'Réservez vos produits de saison' },
    { image: 'assets/images/82de9bf35813c1916c0ab4498a3616fd.jpg', title: 'Agriculture Durable', subtitle: 'Soutenons l\'agriculture responsable' },
    { image: 'assets/images/8d4331f384ad7699ff511251bd0c11e2.jpg', title: 'Livraison Rapide', subtitle: 'De la ferme à votre table en 24h' }
  ];
/*
  produits = [
    {
      id: 1,
      nom: 'Carottes Bio',
      description: 'Carottes fraîches cultivées sans pesticides, riches en bêta-carotène.',
      prix: 2500,
      imageUrl: 'assets/images/f46802e2a877217435cd4cab4b4121f3.jpg'
    },
    {
      id: 2,
      nom: 'Tomates Fraîches',
      description: 'Tomates juteuses idéales pour vos salades et sauces maison.',
      prix: 1800,
      imageUrl: 'assets/images/6ebe7a6d8c56937570cd0ede9ea8f30b.jpg'
    },
    {
      id: 3,
      nom: 'Maïs Local',
      description: 'Maïs séché de qualité supérieure, cultivé localement.',
      prix: 3000,
      imageUrl: 'assets/images/a5e74153da9022b2000dcfceae19aeae.jpg'
    },
    {
      id: 4,
      nom: 'Piment Rouge',
      description: 'Piment fort pour relever vos plats traditionnels camerounais.',
      prix: 5000,
      imageUrl: 'assets/images/c069588576bec9a140f8231de43ede86.jpg'
    },
    {
      id: 5,
      nom: 'Oignons Rouges',
      description: 'Oignons rouges frais pour toutes vos préparations culinaires.',
      prix: 1500,
      imageUrl: 'assets/images/6b2f7bd43b9c6800c1e6ac412a09591e.jpg'
    },
    {
      id: 6,
      nom: 'Ail Local',
      description: 'Ail naturel récolté localement pour sublimer vos plats.',
      prix: 1200,
      imageUrl: 'assets/images/4fce9e4816de5eb6ac1d70f7c66951e2.jpg'
    },
    {
      id: 7,
      nom: 'Poivrons Verts',
      description: 'Poivrons croquants riches en vitamines et minéraux.',
      prix: 2000,
      imageUrl: 'assets/images/9c196a8e9274c35017aff9c7e57d0c2c.jpg'
    },
    {
      id: 8,
      nom: 'Haricots Verts',
      description: 'Haricots verts frais, parfaits pour vos sautés et sauces.',
      prix: 2200,
      imageUrl: 'assets/images/10fb8377d7a30d01ad3c87d67381042a.jpg'
    }
  ];
*/
  constructor(
    private router: Router,
    private panierService: PanierService,
    private produitService: ProduitService 
    ,private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.produitService.getProduitsPhares().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur chargement produits phares', err)
    });
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  addToCart(event: Event, idProduit: number): void {
    event.stopPropagation();
    this.panierService.ajouterProduit(idProduit);
    this.router.navigate(['/panier']);
  }

  showProductDetail(productId: number): void {
    this.router.navigate(['/produit', productId]);
  }

 onImageError(event: Event): void {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/default.jpg';
}

}
