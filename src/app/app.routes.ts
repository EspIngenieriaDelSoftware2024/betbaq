import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./view/register/register.module').then(m => m.RegisterModule)
    }
];
