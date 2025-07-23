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
  ajoutForm: any;
  categories: Categorie[] = [];
  previewImage: string | null = null;

  // Images par défaut pour proposition si pas d'image uploadée
  defaultImages: Record<number, string> = {
    // idCat => URL image par défaut (exemple)
    1: 'assets/images/default-fruits.jpg',
    2: 'assets/images/default-legumes.jpg',
    3: 'assets/images/default-cereales.jpg',
    // ajoute autant que nécessaire
  };

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
      prixU: [null, [Validators.required, Validators.min(0)]],
      dateExpiration: [''],
      categorieId: [null, Validators.required],
      quantiteStock: [null, [Validators.required, Validators.min(0)]]
    });

    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Appelé au submit du formulaire
  ajouterProduit(): void {
    if (this.ajoutForm.valid) {
      const formValues = this.ajoutForm.value;

      // Si aucune image uploadée, proposer image par défaut selon catégorie
      let imageUrl = this.previewImage;
      if (!imageUrl && formValues.categorieId && this.defaultImages[formValues.categorieId]) {
        imageUrl = this.defaultImages[formValues.categorieId];
      }

      const nouveauProduit: Produit = {
        idProduit: 0, // ou géré côté backend
        nomProduit: formValues.nomProduit,
        description: formValues.description,
        prixU: formValues.prixU,
        dateExpiration: formValues.dateExpiration,
        categorieId: formValues.categorieId,
        stock: {
          nom: 'Stock principal',
          quantiteStock: formValues.quantiteStock
        },
        imageUrl: imageUrl || '' // soit base64, soit image par défaut, soit vide
      };

      this.produitService.ajouterProduit(nouveauProduit).subscribe({
        next: () => {
          alert("Produit ajouté avec succès.");
          this.router.navigate(['/agriculteur']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout.", err);
          alert("Erreur lors de l'ajout du produit. Voir console.");
        }
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires et corriger les erreurs.");
      this.ajoutForm.markAllAsTouched(); // affiche les erreurs
    }
  }
}
