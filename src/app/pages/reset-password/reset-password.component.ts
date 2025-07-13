import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // adapte le chemin exact selon ton projet
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      const notifError = document.querySelector('notification-error') as any;
      if (notifError) notifError.show("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        const notif = document.querySelector('notification') as any;
        if (notif) notif.show("✅ Mot de passe réinitialisé avec succès.");
        this.router.navigate(['/login']);
      },
      error: () => {
        const notifError = document.querySelector('notification-error') as any;
        if (notifError) notifError.show("❌ Échec de la réinitialisation. Vérifiez le lien ou réessayez.");
      }
    });
  }


}
