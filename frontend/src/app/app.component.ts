import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  message = '';

  async loadMessage(): Promise<void> {
    const url = `${environment.backendUrl}/api/hello`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.message = data.message ?? 'No message returned';
    } catch (error) {
      this.message = 'Unable to reach backend service';
    }
  }
}
