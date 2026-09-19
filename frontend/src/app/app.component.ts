import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
    const frontendProxyUrl = 'http://localhost:4200/api/frontend-message';

    try {
      const response = await fetch(frontendProxyUrl);
      const data = await response.json();
      this.message = data.message ?? 'No message returned';
    } catch (error) {
      this.message = 'Unable to reach backend service';
    }
  }
}
