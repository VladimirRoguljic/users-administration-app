import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { KeycloakTokenParsed } from 'keycloak-js';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administration-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.scss',
})
export class AdministrationPanelComponent implements OnInit {
  authService = inject(AuthService);

  http = inject(HttpClient);

  loggedUser: KeycloakTokenParsed | undefined = {};

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser() || undefined;
  }

  logOutUser() {
    return this.authService.logout();
  }

  downloadDocument(): void {
    const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'your-document.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
