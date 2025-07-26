import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ClientComponent } from './pages/client/client.component';
import { PanierComponent } from './pages/panier/panier.component';
import { GestionProduitsComponent } from './pages/gestion-produits/gestion-produits.component';
import { ListeProduitsComponent } from './pages/liste-produits/liste-produits.component';
import { ProduitsParCategorieComponent } from './pages/produits-par-categorie/produits-par-categorie.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { RegisterAgriculteurComponent } from './pages/register-agriculteur/register-agriculteur.component';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { LoginAgriculteurComponent } from './pages/login-agriculteur/login-agriculteur.component';
import { GestionCategoriesComponent } from './pages/gestion-categories/gestion-categories.component';
import { AdminGuard } from './core/services/admin-guard.service';
import { AdminDashboardComponent } from './pages/administrateur/administrateur.component';
import { AjouterProduitComponent } from './pages/ajouter-produit/ajouter-produit.component';
import { ModifierProduitComponent } from './pages/modifier-produit/modifier-produit.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ClientProfileComponent } from './pages/profil-client/profil-client.component';
import { ProfilAgriculteurComponent } from './pages/profil-agriculteur/profil-agriculteur.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RechercheComponent } from './layout/recherche/recherche.component';


export const routes: Routes = [
    {path: "", component: HomeComponent},
  {path: 'agriculteur',
  loadComponent: () => import('./pages/agriculteur/agriculteur.component').then(m => m.AgriculteurComponent)},
{path:'client', component:ClientComponent},
{ path: 'panier', component: PanierComponent },
{path:'admin/gestion-produits', component:GestionProduitsComponent},
{path: 'admin/gestion-categories', component: GestionCategoriesComponent},
{path: 'categorie/:nom',  component: ProduitsParCategorieComponent},
{path: 'register-client', component: RegisterClientComponent},
{path: 'register-agriculteur', component: RegisterAgriculteurComponent},
{
  path: 'login-agriculteur',component: LoginAgriculteurComponent},
{
  path: 'login-client', component: LoginClientComponent},

{path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[AdminGuard]},  

{path:'ajouter-produit', component: AjouterProduitComponent},
{path:'liste-produits', component: ListeProduitsComponent},
{path:'modifier-produit/:id', component: ModifierProduitComponent},
{path:'produit/:id', component: ProductDetailComponent},
{path:'admin-dashboard', component: AdminDashboardComponent },
{path:'login-admin', component: LoginAdminComponent },
{path: 'client/profile', component: ClientProfileComponent},
{path: 'profil-agriculteur', component: ProfilAgriculteurComponent},
{path: 'forgot-password' , component: ForgotPasswordComponent},
{path: 'reset-password' , component : ResetPasswordComponent},
{path: 'recherche' , component : RechercheComponent},



];
