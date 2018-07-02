import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { RendererModule } from './renderer/renderer.module';
import { LoginModule } from './login/login.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LogoutModule } from './logout/logout.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { HeaderComponent } from '@app/layout/header/header.component';
// import { StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RendererModule,
    LoginModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    LogoutModule,
    AppRoutingModule
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
