import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokeninterceptorInterceptor } from './interceptor/tokeninterceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { OAuthModule } from 'angular-oauth2-oidc';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp} from '@angular/fire/app';
import { environment} from './environment';
import { getAuth, provideAuth } from '@angular/fire/auth';




export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(OAuthModule.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokeninterceptorInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
};
