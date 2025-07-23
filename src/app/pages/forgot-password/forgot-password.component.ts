import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationComponent } from '../../components/notification/notification.component';
import { NotificationErrorComponent } from '../../components/notification-error/notification-error.component';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        // Notification de succès
        const notif = document.querySelector('notification') as any;
        if (notif) notif.show("📧 Email envoyé avec succès. Vérifiez votre boîte de réception.");
      },
      error: (err) => {
        // Notification d'erreur
        const notifError = document.querySelector('notification-error') as any;
        if (notifError) notifError.show("❌ Une erreur est survenue. Vérifiez l'adresse email saisie.");
      }
    });
  }


}
