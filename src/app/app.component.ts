import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterModalComponent } from "./components/register-modal/register-modal.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, RegisterModalComponent, LoginModalComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nnam-frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
     const type = this.authService.getUserType();
    if (type === 'client') {
      this.router.navigate(['/client']);
    } else if (type === 'agriculteur') {
      this.router.navigate(['/agriculteur']);
    }
  console.log('HomeComponent loaded');
}

}