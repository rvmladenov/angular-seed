import { Routes, RouterModule } from '@angular/router';
import { URLS } from '@app/config/app.config';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/' + URLS.RENDERER, pathMatch: 'full' },
];

export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);
