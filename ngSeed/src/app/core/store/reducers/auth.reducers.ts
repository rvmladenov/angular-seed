import { LoginUser } from "@app/login/login-user.model";
import { AuthActions, AuthActionTypes } from "@app/core/store/actions/auth.actions";

export interface AuthState {
  loggedIn: boolean,
  user: LoginUser
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload
      };

    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined
      };

    default:
      return state;
  }
}
