export {};

declare global {
  interface Window {
    RUNTIME_CONFIG: {
      KEYCLOAK_URL: string;
      KEYCLOAK_REALM: string;
      KEYCLOAK_CLIENT: string;
      API_BASE_URL: string;
    };
  }
}
