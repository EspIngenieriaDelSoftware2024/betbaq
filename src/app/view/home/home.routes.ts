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
            },
            {
                path: 'league',
                loadChildren: () => import('../league/league.module').then(m => m.LeagueModule)
            },
            // {
            //     path: 'team',
            //     loadChildren: () => import('../team/team.module').then(m => m.TeamModule)
            // },
            // {
            //     path: 'player',
            //     loadChildren: () => import('../player/player.module').then(m => m.PlayerModule)
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }