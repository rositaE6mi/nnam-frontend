import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from './pages/navbar/navbar.component';
=======
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterModalComponent } from "./components/register-modal/register-modal.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { AuthService } from './core/services/auth.service';
>>>>>>> Michael-F

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, HomeComponent, NavbarComponent],
=======
  imports: [CommonModule, NavbarComponent, RouterOutlet, RegisterModalComponent, LoginModalComponent], 
>>>>>>> Michael-F
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nnam-frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
     const type = this.authService.getUserType();
    if (type === 'CLIENT') {
      this.router.navigate(['/client']);
    } else if (type === 'AGRICULTEUR') {
      this.router.navigate(['/agriculteur']);
    }
  console.log('HomeComponent loaded');
}

}