import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() type: 'client' | 'agriculteur' = 'client';

  constructor(private router: Router) {}

  sInscrire(): void {
    alert(`Inscription ${this.type} réussie !`);

    if (this.type === 'client') {
      this.router.navigate(['/client']);
    } else if (this.type === 'agriculteur') {
      this.router.navigate(['/agriculteur']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
