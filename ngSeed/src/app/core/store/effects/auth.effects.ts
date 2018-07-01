import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from "@app/core/store/actions/auth.actions";
import { tap } from 'rxjs/operators';

import { defer, of } from 'rxjs';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) { }

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user", JSON.stringify(action.payload.user)))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem("user");
      // this.router.navigateByUrl('login');
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
