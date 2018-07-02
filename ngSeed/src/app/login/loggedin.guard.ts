import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "@app/core/store/selectors/auth.selector";
import { AppState } from "@app/reducers";
import { URLS } from "@app/config/app.config";
import { AuthService } from "@app/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

    // constructor(private store: Store<AppState>, private router: Router) { }
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.loggedIn) {
            this.router.navigateByUrl(URLS.RENDERER);
        }
        return true;
    }
}