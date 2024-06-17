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
import { AsistenciasreporteComponent } from './asistenciasreporte/asistenciasreporte.component';
import { AsistenciasDocenteComponent } from './asistencias-docente/asistencias-docente.component';
import { AsistenciasReporteFacComponent } from './asistencias-reporte-fac/asistencias-reporte-fac.component';
import { AsistenciasDetallesFacComponent } from './asistencias-detalles-fac/asistencias-detalles-fac.component';
import { AsistenciasReporteCarrComponent } from './asistencias-reporte-carr/asistencias-reporte-carr.component';
import { AsistenciasDetallesCarrComponent } from './asistencias-detalles-carr/asistencias-detalles-carr.component';
import { LicenciaslistComponent } from './licenciaslist/licenciaslist.component';
import { GestionesListComponent } from './gestiones-list/gestiones-list.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProgramacionesAcademicasComponent } from './programaciones-academicas/programaciones-academicas.component';
import { CrearProgramacionComponent } from './crear-programacion/crear-programacion.component';



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
    { path: 'asistencias', component: AsistenciasreporteComponent, canActivate: [adminGuard] },
    { path: 'asistencias/docente/:id', component: AsistenciasDocenteComponent, canActivate: [adminGuard] },
    { path: 'facultades/asistencias/reporte/:id', component: AsistenciasReporteFacComponent, canActivate: [adminGuard] },
    { path: 'facultades/asistencias/detalles/:id', component: AsistenciasDetallesFacComponent, canActivate: [adminGuard] },
    { path: 'carreras/asistencias/reporte/:id', component: AsistenciasReporteCarrComponent, canActivate: [adminGuard] },
    { path: 'carreras/asistencias/detalles/:id', component: AsistenciasDetallesCarrComponent, canActivate: [adminGuard] },
    { path: 'licencias', component: LicenciaslistComponent, canActivate: [adminGuard] },
    { path: 'gestiones/:id', component: GestionesListComponent, canActivate: [adminGuard] },
    { path: 'fechas/:id', component: CalendarioComponent, canActivate: [adminGuard] },
    { path: 'programaciones/:id', component: ProgramacionesAcademicasComponent, canActivate: [adminGuard] },
    { path: 'programaciones/crear/:id', component: CrearProgramacionComponent, canActivate: [adminGuard] },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
