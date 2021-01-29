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

// @Injectable()
// export class verifySessionGuard implements CanActivate {

//     constructor(private mainService: MainServiceService, private router: Router) { }
//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

//         return this.mainService.verifySession(state.root.queryParams.token).pipe(map((response: any) => {
//             if (response.statusCode == 200) {
//                 return true;
//             }
//             window.location.href = "https://sandbox.dev.clover.com"
//             return false;

//         }), catchError(err => {
//             window.location.href = "https://sandbox.dev.clover.com"
//             return ObservableOf(false);
//         })
//         );
//     }
// }



