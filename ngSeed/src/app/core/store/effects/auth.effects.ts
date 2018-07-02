import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from "@app/core/store/actions/auth.actions";
import { tap } from 'rxjs/operators';

import { defer, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginUser } from '@app/login/login-user.model';
import { URLS } from '@app/config/app.config';
import { AuthService } from '@app/auth/auth.service';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService) { }

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      this.authService.loggedIn = true;
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem("user");
      this.authService.loggedIn = false;
      this.router.navigateByUrl(URLS.LOGIN);
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      return of(new Login(JSON.parse(userData)));
    }

    return of(new Logout());
  });

}
