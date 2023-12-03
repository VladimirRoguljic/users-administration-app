import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { initailizer } from './appInit';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakBearerProvider } from './providers/keycloak-bearer.provider';

bootstrapApplication(AppComponent, {
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initailizer,
      multi: true,
      deps: [KeycloakService],
    },
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    KeycloakBearerProvider,
  ],
}).catch((err) => console.error(err));
