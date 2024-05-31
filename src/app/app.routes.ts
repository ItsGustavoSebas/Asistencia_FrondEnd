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



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [adminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [usersGuard] },
    { path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard] },
    { path: 'users', component: UserslistComponent, canActivate: [adminGuard] },
    { path: 'roles', component: RoleslistComponent, canActivate: [adminGuard] },
    { path: 'roles/update/:id', component: UpdatedroleComponent, canActivate: [adminGuard] },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
