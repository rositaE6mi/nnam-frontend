import { Component, OnInit, HostListener } from '@angular/core';
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
  userType: 'CLIENT' | 'AGRICULTEUR' | 'ADMIN' | null = null;

  categories: Categorie[] = [];
  searchQuery = '';

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

    // Fermer menu mobile/déroulants à chaque navigation
    this.router.events.subscribe(() => {
      this.fermerTout();
    });
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

  fermerDropdown(): void {
    this.dropdownOpen = null;
  }

  fermerTout(): void {
    this.mobileMenuOpen = false;
    this.dropdownOpen = null;
  }

  logout(): void {
    this.authService.logout();
    this.userType = null;
    this.router.navigate(['/']);
  }

 

onSearch(): void {
  const query = this.searchQuery.trim();
  if (query.length === 0) return;

  this.fermerTout(); // ferme dropdown ou menu mobile
  this.router.navigate(['/recherche'], { queryParams: { q: query } });
}


@HostListener('document:click', ['$event'])
onClickOutside(event: Event): void {
  const target = event.target as HTMLElement;
  const clickedInsideDropdown = target.closest('.relative');

  if (!clickedInsideDropdown) {
    this.dropdownOpen = null;
  }



}
}
