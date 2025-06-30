import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login-modal.component.css'],
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent {
  @Input() open = false;
  @Input() type: 'client' | 'agriculteur' | null = null;
  @Output() close = new EventEmitter<void>();

  form = {
    email: '',
    password: '',
    remember: false
  };

  onSubmit() {
    // Ajoute ici la logique d'authentification
    this.close.emit();
  }
}