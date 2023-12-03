import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { KeycloakBearerInterceptor } from '../interceptors/keycloak-bearer.interceptor';

export const KeycloakBearerProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true,
};
