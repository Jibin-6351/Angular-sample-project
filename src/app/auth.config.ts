import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: getRedirectUri(),
  clientId: '44009330520-vr3q0bh29873r05190c44gqcgqg7aqmc.apps.googleusercontent.com',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile,email',
  oidc: true,
  responseType: 'code',
  showDebugInformation: true,
  requireHttps: true,

};



function getRedirectUri(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:4200'; 
}
