import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCreateComponent } from './register-create/register-create.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterCreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRouterModule { }