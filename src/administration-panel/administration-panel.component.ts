import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { KeycloakTokenParsed } from 'keycloak-js';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProxyService } from '../service/proxy.service';

@Component({
  selector: 'app-administration-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.scss',
})
export class AdministrationPanelComponent implements OnInit {
  authService = inject(AuthService);

  proxyService = inject(ProxyService);

  http = inject(HttpClient);

  loggedUser: KeycloakTokenParsed | undefined = {};

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser() || undefined;
  }

  async logOutUser() {
    await this.authService.logout(window.location.origin);
  }

  downloadDocument(event: Event): void {
    event.preventDefault();

    this.proxyService.getPdf().subscribe((blob: Blob) => {
      const link = document.createElement('a');
      const blobUrl = URL.createObjectURL(blob);

      link.href = blobUrl;
      link.download = 'sample.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
