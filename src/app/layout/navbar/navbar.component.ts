// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../core/services/categorie.service';
import { Categorie } from '../../core/models/categorie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dropdownOpen: string | null = null;
  mobileMenuOpen = false;
  itemCount$!: Observable<number>;
  userType: 'client' | 'agriculteur' | 'admin' | null = null;

  categories: Categorie[] = [];
  searchQuery = '';
  searchResults: Categorie[] = [];

  constructor(
    private panierService: PanierService,
    public authService: AuthService,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.itemCount$ = this.panierService.getItemCount();
    this.userType = this.authService.getUserType();
    this.chargerCategories();
  }

  chargerCategories() {
    this.categorieService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  toggleDropdown(menu: string): void {
    this.dropdownOpen = this.dropdownOpen === menu ? null : menu;
  }

  isDropdownOpen(menu: string): boolean {
    return this.dropdownOpen === menu;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.userType = null;
    this.router.navigate(['/']);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.categorieService.searchCategories(this.searchQuery).subscribe({
        next: (results) => this.searchResults = results,
        error: (err) => console.error(err)
      });
    }
  }
}