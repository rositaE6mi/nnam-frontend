import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductCard {
  name: string;
  desc: string;
  price: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carouselImages = [
    { url: 'assets/carousel1.jpg', alt: 'Femme souriante', legend: '' }
  ];
  currentImage = 0;

  productCards: ProductCard[] = [
    {
      name: 'Carottes Bio',
      desc: 'Carottes fraîches cultivées sans pesticides',
      price: '2500 FCFA/kg',
      color: '#22b573',
      icon: 'fa-carrot'
    },
    {
      name: 'Maïs Local',
      desc: 'Maïs de première qualité, séché naturellement',
      price: '1800 FCFA/kg',
      color: '#ffa900',
      icon: 'fa-seedling'
    },
    {
      name: 'Tomates Fraîches',
      desc: 'Tomates juteuses, parfaites pour vos salades',
      price: '3000 FCFA/kg',
      color: '#ef5350',
      icon: 'fa-apple-alt'
    },
    {
      name: 'Piment Rouge',
      desc: 'Piment fort pour relever vos plats traditionnels',
      price: '5000 FCFA/kg',
      color: '#7e57c2',
      icon: 'fa-pepper-hot'
    }
  ];
}