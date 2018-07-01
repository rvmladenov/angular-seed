import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { URLS } from '@app/config/app.config';
import { LoggedInGuard } from '@app/login/loggedin.guard';

const ROUTES: Routes = [
    {
        path: URLS.LOGIN,
        component: LoginComponent,
        canActivate: [LoggedInGuard]
    }
];

export const LoginRouting = RouterModule.forRoot(ROUTES);
