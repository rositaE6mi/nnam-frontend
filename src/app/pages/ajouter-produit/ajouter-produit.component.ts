import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { CategorieService } from '../../core/services/categorie.service';
import { Categorie } from '../../core/models/categorie.model';
import { Produit } from '../../core/models/produit.model';

@Component({
  selector: 'app-ajouter-produit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  ajoutForm: any; // On initialise à undefined pour éviter l'erreur d'utilisation avant l'initialisation
  categories: Categorie[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ajoutForm = this.fb.group({
      nomProduit: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      prixU: [0, [Validators.required, Validators.min(0)]],
      dateExpiration: [''],
      categorieId: [0, Validators.required],
      quantiteStock: [0, [Validators.required, Validators.min(0)]]
    });

    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  ajouterProduit() {
    if (this.ajoutForm.valid) {
      const nouveauProduit: Produit = {
        idProduit: 0, // L'ID sera généré par le backend
        nomProduit: this.ajoutForm.value.nomProduit,
        description: this.ajoutForm.value.description,
        prixU: this.ajoutForm.value.prixU,
        dateExpiration: this.ajoutForm.value.dateExpiration,
        categorieId: this.ajoutForm.value.categorieId,
        stock: {
          nom: 'Stock principal',
          quantiteStock: this.ajoutForm.value.quantiteStock
        }
      };

      this.produitService.ajouterProduit(nouveauProduit).subscribe({
        next: () => {
          alert("Produit ajouté avec succès.");
          this.router.navigate(['/agriculteur']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout.", err);
          alert("Erreur, voir console.");
        }
      });
    } else {
      // Si le formulaire n'est pas valide, afficher un message d'erreur
      alert("Veuillez remplir tous les champs obligatoires et corriger les erreurs.");
    }
  }
}