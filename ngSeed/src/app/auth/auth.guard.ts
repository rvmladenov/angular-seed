import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "@app/core/store/selectors/auth.selector";
import { AppState } from "@app/reducers";
import { URLS } from "@app/config/app.config";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                const redirectUrl = !loggedIn ? URLS.LOGIN : URLS.RENDERER;
                this.router.navigateByUrl(redirectUrl);
            }));
    }
}