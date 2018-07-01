import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { URLS } from '@app/config/app.config';

const ROUTES: Routes = [
    {
        path: URLS.LOGIN,
        component: LoginComponent
    }
];

export const LoginRouting = RouterModule.forRoot(ROUTES);
