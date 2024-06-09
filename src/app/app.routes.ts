import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserslistComponent } from './userslist/userslist.component';
import { usersGuard, adminGuard } from './users.guard';
import { RoleslistComponent } from './roleslist/roleslist.component';
import { UpdatedroleComponent } from './updatedrole/updatedrole.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FacultadeslistComponent } from './facultadeslist/facultadeslist.component';
import { FacultadescreateComponent } from './facultadescreate/facultadescreate.component';
import { FacultadesupdateComponent } from './facultadesupdate/facultadesupdate.component';
import { CarreraslistComponent } from './carreraslist/carreraslist.component';
import { CarrerasupdateComponent } from './carrerasupdate/carrerasupdate.component';
import { CarrerasmateriasComponent } from './carrerasmaterias/carrerasmaterias.component';
import { CarrerascreateComponent } from './carrerascreate/carrerascreate.component';
import { MateriaslistComponent } from './materiaslist/materiaslist.component';
import { MateriasupdateComponent } from './materiasupdate/materiasupdate.component';
import { MateriascreateComponent } from './materiascreate/materiascreate.component';
import { ModuloslistComponent } from './moduloslist/moduloslist.component';
import { ModulosupdateComponent } from './modulosupdate/modulosupdate.component';
import { ModuloscreateComponent } from './moduloscreate/moduloscreate.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [adminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [usersGuard] },
    { path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard] },
    { path: 'users', component: UserslistComponent, canActivate: [adminGuard] },
    { path: 'roles', component: RoleslistComponent, canActivate: [adminGuard] },
    { path: 'roles/update/:id', component: UpdatedroleComponent, canActivate: [adminGuard] },
    { path: 'facultades', component: FacultadeslistComponent, canActivate: [usersGuard] },
    { path: 'facultades/update/:id', component: FacultadesupdateComponent, canActivate: [adminGuard] },
    { path: 'facultades/create', component: FacultadescreateComponent, canActivate: [adminGuard] },
    { path: 'carreras', component: CarreraslistComponent, canActivate: [usersGuard] },
    { path: 'carreras/update/:id', component: CarrerasupdateComponent, canActivate: [adminGuard] },
    { path: 'carreras/create', component: CarrerascreateComponent, canActivate: [adminGuard] },
    { path: 'materias', component: MateriaslistComponent, canActivate: [usersGuard] },
    { path: 'materias/update/:id', component: MateriasupdateComponent, canActivate: [adminGuard] },
    { path: 'materias/create', component: MateriascreateComponent, canActivate: [adminGuard] },
    { path: 'carreras/materias/:id', component: CarrerasmateriasComponent, canActivate: [usersGuard] },
    { path: 'modulos', component: ModuloslistComponent, canActivate: [usersGuard] },
    { path: 'modulos/update/:id', component: ModulosupdateComponent, canActivate: [adminGuard] },
    { path: 'modulos/create', component: ModuloscreateComponent, canActivate: [adminGuard] },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
