import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-agriculteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agriculteur.component.html',
  styleUrls: ['./agriculteur.component.css']
})
export class AgriculteurComponent implements OnInit {
  stats = [
    { libelle: 'Produits Actifs', valeur: 0 },
    { libelle: 'Commandes en Cours', valeur: 8 },
    { libelle: 'Revenus (FCFA)', valeur: '45,000' },
    { libelle: 'Total Commandes', valeur: 156 }
  ];

  commandes = [
    {
      id: '001',
      client: 'Jean Dupont',
      produits: 'Carottes Bio (2kg)',
      total: 5000,
      statut: 'En attente',
      action: 'Accepter'
    },
    {
      id: '002',
      client: 'Marie Martin',
      produits: 'Maïs Local (5kg)',
      total: 9000,
      statut: 'Confirmée',
      action: 'Préparer'
    }
  ];

  constructor(
    private produitService: ProduitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdminOrAgriculteur()) {
      alert("Accès refusé.");
      this.router.navigate(['/']);
      return;
    }

    this.chargerStatistiques();
  }

  chargerStatistiques() {
    this.produitService.getAllProduits().subscribe({
      next: (data) => {
        this.stats[0].valeur = data.length; // Mettre à jour le nombre de produits actifs
      },
      error: (err) => console.error(err)
    });
  }

  goToAjouterProduit() {
    this.router.navigate(['/ajouter-produit']);
  }

  goToListeProduits() {
    this.router.navigate(['/liste-produits']);
  }
}