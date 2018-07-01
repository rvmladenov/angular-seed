import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '@app/core/store/reducers/auth.reducers';
import { AuthEffects } from '@app/core/store/effects/auth.effects';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from '@app/login/loggedin.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard, LoggedInGuard]
    }
  }
}
