export const environment = {
    keycloak: {
      issuer:
        'https://sso-keycloak-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/auth',
      realm: 'hackathon',
      clientId: 'maveric-ht-frontend',
      redirectUri: 'http://localhost:4200/home',
    },
    urls: {
      customerServiceUrl: 'http://52.90.228.22:8080/',
      savingsServiceUrl: 'http://52.90.228.22:8081/',
      insightsServiceUrl: 'http://52.90.228.22:8082/',
      loanServiceUrl: 'http://52.90.228.22:8083/',
    },
  };
  
