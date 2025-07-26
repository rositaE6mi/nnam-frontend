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
  selectedImageFile: File | null = null; // ✅ fichier sélectionné

  defaultImages: Record<number, string> = {
    1: 'assets/images/default-fruits.jpg',
    2: 'assets/images/default-legumes.jpg',
    3: 'assets/images/default-cereales.jpg',
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
      quantiteStock: [null, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });

    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImageFile = file; // ✅ on stocke le fichier
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ajouterProduit(): void {
    if (this.ajoutForm.valid) {
      const formValues = this.ajoutForm.value;

      let imageUrl = this.previewImage;
      if (!imageUrl && formValues.categorieId && this.defaultImages[formValues.categorieId]) {
        imageUrl = this.defaultImages[formValues.categorieId];
      }

      const nouveauProduit: Produit = {
        idProduit: 0,
        nomProduit: formValues.nomProduit,
        description: formValues.description,
        prixU: formValues.prixU,
        dateExpiration: formValues.dateExpiration,
        categorieId: formValues.categorieId,
        stock: {
          nom: 'Stock principal',
          quantiteStock: formValues.quantiteStock
        },
        imageUrl: imageUrl || ''
      };

      const formData = new FormData();
      formData.append('produit', new Blob([JSON.stringify(nouveauProduit)], { type: 'application/json' }));

      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile); // ✅ fichier image
      }

      this.produitService.ajouterProduitAvecImage(formData).subscribe({
        next: () => {
          alert("Produit ajouté avec succès.");
          this.router.navigate(['/agriculteur']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du produit :", err);
          alert("Erreur lors de l'ajout du produit. Voir la console.");
        }
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
      this.ajoutForm.markAllAsTouched();
    }
  }
}
