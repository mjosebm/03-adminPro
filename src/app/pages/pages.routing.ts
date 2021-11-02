import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';


const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile'}},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Tema'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesa'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },

            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'} },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'} },

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
