import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { environment } from './assets/environment';

export function initailizer(keycloak: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions = {
    config: environment.keycloakConfig,
    initOptions: {
      redirectUri: 'http://localhost:4200/',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    },
  };

  return async (): Promise<boolean> => {
    // Assuming keycloak.init returns a boolean indicating success or failure.
    try {
      await keycloak.init(options);
      return true; // Return true if initialization is successful.
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      return false; // Return false if initialization fails.
    }
  };
}
