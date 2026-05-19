import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // Guard against SSR errors since we use localStorage
  if (isPlatformBrowser(platformId)) {
    const user = localStorage.getItem('userName');
    debugger
    
    if (user) {
      return true; // Allow access
    }
  }
  // If not logged in, redirect to login page
  router.navigate(['/login']);
  return false;
};
