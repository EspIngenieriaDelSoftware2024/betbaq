import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCreateComponent } from './login-create/login-create.component';

const routes: Routes = [
    {
        path: '',
        component: LoginCreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRouterModule { }