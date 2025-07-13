import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
message = '';
  visible = false;

  show(msg: string) {
    this.message = msg;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}
