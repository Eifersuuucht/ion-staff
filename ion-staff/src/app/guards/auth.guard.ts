import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DataGetterService} from "../service/data-getter.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataGetterService: DataGetterService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.dataGetterService.getUser() !== '';
    if(!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    return isLoggedIn;
  }
  
}
