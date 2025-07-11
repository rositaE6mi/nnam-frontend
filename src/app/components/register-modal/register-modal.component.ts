import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./register-modal.component.css'],
  templateUrl: './register-modal.component.html'
})
export class RegisterModalComponent {
  @Input() open = false;
  @Input() type: 'client' | 'agriculteur' | null = null;
  @Output() close = new EventEmitter<void>();

  form = {
    prenom: '',
    nom: '',
    email: '',
    tel: '',
    password: '',
    confirmPassword: '',
    adresse: '',
    localisation: '',
    superficie: '',
    cultures: ''
  };

  get isFarmer() { return this.type === 'agriculteur'; }
  get isClient() { return this.type === 'client'; }

  onSubmit() {
    // Ajoute ici la logique de traitement du formulaire
    this.close.emit();
  }
}