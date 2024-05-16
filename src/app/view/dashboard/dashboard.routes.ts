import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

// Import your components here

const routes: Routes = [
    {
        path: '',
        component: DashboardListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }