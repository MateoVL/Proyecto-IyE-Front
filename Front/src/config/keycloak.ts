import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: window.RUNTIME_CONFIG?.KEYCLOAK_URL || 'http://localhost:8180',
  realm: window.RUNTIME_CONFIG?.KEYCLOAK_REALM || 'iye',
  clientId: window.RUNTIME_CONFIG?.KEYCLOAK_CLIENT || 'iye-frontend',
});

export default keycloak;
