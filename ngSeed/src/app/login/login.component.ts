import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { LoginUser } from '@app/login/login-user.model';
import { Login } from '@app/core/store/actions/auth.actions';
import { URLS } from '@app/config/app.config';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const credentials = this.form.value;
    this.auth
      .login(credentials.email, credentials.password)
      .pipe(
        tap((userResponse: LoginUser) => {
          const user: LoginUser = { username: credentials.email }
          this.store.dispatch(new Login(user));
          this.router.navigateByUrl(URLS.RENDERER);
        })
      )
      .subscribe(
        noop
      );
  }

}
