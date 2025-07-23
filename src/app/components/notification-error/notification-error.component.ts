import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-error',
  standalone: true,
  imports: [],
  templateUrl: './notification-error.component.html',
  styleUrl: './notification-error.component.css'
})
export class NotificationErrorComponent {

  message = '';
  visible = false;

  show(msg: string) {
    this.message = msg;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}
