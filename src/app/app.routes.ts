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
import { CarreraslistComponent } from './carreraslist/carreraslist.component';
import { CarrerasupdateComponent } from './carrerasupdate/carrerasupdate.component';
import { CarrerasmateriasComponent } from './carrerasmaterias/carrerasmaterias.component';
import { CarrerascreateComponent } from './carrerascreate/carrerascreate.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [adminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [usersGuard] },
    { path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard] },
    { path: 'users', component: UserslistComponent, canActivate: [adminGuard] },
    { path: 'roles', component: RoleslistComponent, canActivate: [adminGuard] },
    { path: 'roles/update/:id', component: UpdatedroleComponent, canActivate: [adminGuard] },
    { path: 'carreras', component: CarreraslistComponent, canActivate: [usersGuard] },
    { path: 'carreras/update/:id', component: CarrerasupdateComponent, canActivate: [adminGuard] },
    { path: 'carreras/create', component: CarrerascreateComponent, canActivate: [adminGuard] },
    { path: 'carreras/materias/:id', component: CarrerasmateriasComponent, canActivate: [usersGuard] },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
