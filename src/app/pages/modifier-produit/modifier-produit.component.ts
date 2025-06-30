import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../core/services/produit.service';
import { CategorieService } from '../../core/services/categorie.service';
import { Categorie } from '../../core/models/categorie.model';
import { Produit } from '../../core/models/produit.model';

@Component({
  selector: 'app-modifier-produit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {
  produitId: number = 0;
  produit: Produit = {
    idProduit: 0,
    nomProduit: '',
    description: '',
    prixU: 0,
    dateExpiration: '',
    categorieId: 0,
    stock: {
      nom: 'Stock principal',
      quantiteStock: 0
    }
  };
  categories: Categorie[] = [];
  modificationForm: any; // Initialisé dans ngOnInit

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modificationForm = this.fb.group({
      nomProduit: ['', Validators.required],
      description: [''],
      prixU: [0, Validators.required],
      dateExpiration: [''],
      categorieId: [0, Validators.required],
      quantiteStock: [0, Validators.required]
    });

    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getProduitById(this.produitId).subscribe({
      next: (data) => {
        this.produit = data;
        this.modificationForm.patchValue({
          nomProduit: data.nomProduit,
          description: data.description,
          prixU: data.prixU,
          dateExpiration: data.dateExpiration,
          categorieId: data.categorieId,
          quantiteStock: data.stock.quantiteStock
        });
      },
      error: (err) => console.error(err)
    });

    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  modifierProduit() {
    if (this.modificationForm.valid) {
      const produitModifie: Produit = {
        idProduit: this.produitId,
        nomProduit: this.modificationForm.value.nomProduit,
        description: this.modificationForm.value.description,
        prixU: this.modificationForm.value.prixU,
        dateExpiration: this.modificationForm.value.dateExpiration,
        categorieId: this.modificationForm.value.categorieId,
        stock: {
          nom: 'Stock principal',
          quantiteStock: this.modificationForm.value.quantiteStock
        }
      };

      this.produitService.modifierProduit(produitModifie).subscribe({
        next: () => {
          alert("Produit modifié avec succès.");
          this.router.navigate(['/liste-produits']);
        },
        error: (err) => {
          console.error("Erreur lors de la modification.", err);
          alert("Erreur lors de la modification. Veuillez réessayer.");
        }
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires et corriger les erreurs.");
    }
  }
}