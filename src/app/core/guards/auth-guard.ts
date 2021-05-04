import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
// import { MainServiceService } from '../services/main-service.service';
import { Observable, of as ObservableOf, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class loggedInGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate() {
        if (sessionStorage.getItem("isLoggedIn") == "true") {
            return true;
        } else {
            sessionStorage.clear();
            this.router.navigateByUrl('/auth')
        }
    }
}

@Injectable()
export class otpGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate() {
        console.log(sessionStorage.getItem("email"))
        if (sessionStorage.getItem("email")) {
            return true;
        } else {
            sessionStorage.clear();
            this.router.navigateByUrl('/auth')
        }
    }
}




