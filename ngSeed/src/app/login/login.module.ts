import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouting } from '@app/login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRouting
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
