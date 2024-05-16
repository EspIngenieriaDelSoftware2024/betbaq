import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

// Import your components here

const routes: Routes = [
    {
        path: '',
        component: HomeDashboardComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }