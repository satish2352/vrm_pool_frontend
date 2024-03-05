// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: HelperService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login route if not logged in
      return false;
    }
  }
}
