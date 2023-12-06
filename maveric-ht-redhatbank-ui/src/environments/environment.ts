export const environment = {
  keycloak: {
    issuer:
      'https://sso-keycloak-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/auth',
    realm: 'hackathon',
    clientId: 'maveric-ht-frontend',
    redirectUri: 'http://localhost:4200/home',
  },
  urls: {
    customerServiceUrl:
      'https://customer-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/',
    savingsServiceUrl:
      'http://saving-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/',
    insightsServiceUrl:
      'https://insights-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/',
    loanServiceUrl:
      'http://loan-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/',
    ssoKeyCloakUrl:
      'https://sso-keycloak-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/',
  },
};
