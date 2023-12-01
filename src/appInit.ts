import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { environment } from './assets/environment';

export function initailizer(keycloack: KeycloakService): () => Promise<any> {
  const options: KeycloakOptions = {
    config: environment.keycloackConfig,
    initOptions: {
      redirectUri: 'http://localhost:4200/',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    },
  };

  return (): Promise<any> => keycloack.init(options);
}
