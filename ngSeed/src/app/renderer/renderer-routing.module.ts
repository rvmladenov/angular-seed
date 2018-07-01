import { Routes, RouterModule } from '@angular/router';
import { RendererComponent } from '@app/renderer/renderer.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { URLS } from '@app/config/app.config';

const ROUTES: Routes = [
    {
        path: URLS.RENDERER,
        component: RendererComponent,
        canActivate: [AuthGuard]
    },
];

export const RendererRouting = RouterModule.forRoot(ROUTES);
