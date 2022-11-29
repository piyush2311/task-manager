import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
}

// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private router: Router) {}

//     canActivate() {
//         if (localStorage.getItem('isLoggedin')) {
//             return true;
//         }

//         this.router.navigate(['/login']);
//         return false;
//     }
// }
