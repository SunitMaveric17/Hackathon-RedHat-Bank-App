import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export function initializer(
  keycloak: KeycloakService,
  router: Router
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("before each")
        // console.log(environment.keycloak.issuer)
        // console.log(environment.keycloak.realm)
        // console.log(environment.keycloak.clientId)

        await keycloak.init({
          config: {
            // url: environment.keycloak.issuer,
            // realm: environment.keycloak.realm,
            // clientId: environment.keycloak.clientId,
            url: 'https://sso-keycloak-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/auth',
            realm: 'hackathon',
            clientId: 'maveric-ht-frontend',
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: true,
          },
        });
        console.log('after each');
        const accessToken = keycloak.getKeycloakInstance().token;
        console.log('Access Token:', accessToken);
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
