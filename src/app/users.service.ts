import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private BASE_URL = "https://heartfelt-quietude-production-46c6.up.railway.app";

  constructor(private http: HttpClient) {}
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$: Observable<boolean> = this.authStatus.asObservable();

  async login(email: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/auth/login`;
    try {
      const response = await this.http
        .post<any>(url, { email, password })
        .toPromise();
      if (response.statusCode == 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("roles", JSON.stringify(response.roles));
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.permissions)
        );
        this.authStatus.next(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(userData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/auth/register`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, userData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByRole(role: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-users-roles/${role}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchUsersByName(name: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-users-names?name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByRoleAndName(
    role: string,
    name: string,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-users-roles-names?role=${role}&name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-all-users`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getYourProfile(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUSer(
    userId: string,
    userData: any,
    token: string,
    roles: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    let params = new HttpParams().set("updatedRoles", roles);
    try {
      const response = this.http
        .put<any>(url, userData, { headers, params })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCargos(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/cargos`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener los cargos: ${error}`);
    }
  }

  async getAllRoles(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/roles`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener los roles: ${error}`);
    }
  }

  async getAllPermissions(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/permissions`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener los permisos: ${error}`);
    }
  }

  async getRolesById(roleId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/roles/${roleId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(
    roleId: number,
    permissionsIds: number[],
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/admin/roles/${roleId}/permissions`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http
        .put<any>(url, permissionsIds, { headers })
        .toPromise();
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCarreras(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las carreras: ${error}`);
    }
  }

  async deleteCarrera(carreraId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/delete/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateCarrera(
    carreraId: string,
    carreraData: any,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/update/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, carreraData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCarrerasById(carreraId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllFacultades(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las facultades: ${error}`);
    }
  }

  async getAllFacultades2(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/f`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las facultades: ${error}`);
    }
  }

  async getAllasistencias(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/asistencias/estados`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllasistenciasName(
    token: string,
    name: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/asistencias/name/estados`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    url += `?name=${name}`;
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciasDocente(
    docenteId: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/asistencias/web/${docenteId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciasDocenteEstado(
    docenteId: string,
    estado: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/asistencias/${docenteId}/${estado}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllMaterias(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las materias: ${error}`);
    }
  }

  async createCarrera(carreraData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, carreraData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCarrera_Materias(carreraId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/materias/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las materias: ${error}`);
    }
  }

  async createFacultad(facultadData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, facultadData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletefacultad(facultadId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/delete/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatefacultad(
    facultadId: string,
    facultadData: any,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/update/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, facultadData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getfacultadsById(facultadId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchFacultadsByName(name: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/facultades/get-facultades-names?name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createMateria(materiaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, materiaData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletemateria(materiaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias/delete/${materiaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatemateria(
    materiaId: string,
    materiaData: any,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias/update/${materiaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, materiaData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getmateriasById(materiaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias/${materiaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createModulo(moduloData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, moduloData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllmodulos(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las modulos: ${error}`);
    }
  }

  async deletemodulo(moduloId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos/delete/${moduloId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatemodulo(
    moduloId: string,
    moduloData: any,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos/update/${moduloId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, moduloData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getmodulosById(moduloId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos/${moduloId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchMateriasByName(name: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/materias/get-materias-names?name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchCarrerasByName(name: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/carreras/get-carreras-names?name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchModulosByName(name: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/modulos/get-modulos-names?name=${name}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllasistenciasFac(
    token: string,
    facultadId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/facultades/asistencias/estados/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllasistenciasNameFac(
    token: string,
    facultadId: string,
    name: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/facultades/asistencias/name/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    url += `?name=${name}`;
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciasfacultad(
    facultadId: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/facultades/asistencias/web/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciasfacultadEstado(
    facultadId: string,
    estado: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/facultades/asistencias/${facultadId}/${estado}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciascarrera(
    carreraId: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/carreras/asistencias/web/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllAsistenciascarreraEstado(
    carreraId: string,
    estado: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/carreras/asistencias/${carreraId}/${estado}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllasistenciasCarr(
    token: string,
    carreraId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/carreras/asistencias/estados/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllasistenciasNameCarr(
    token: string,
    carreraId: string,
    name: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/carreras/asistencias/name/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    url += `?name=${name}`;
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las asistencias: ${error}`);
    }
  }

  async getAllLicencias(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/admin/licencias`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las licencias: ${error}`);
    }
  }

  async getAllLicenciasEstado(
    estado: string,
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/admin/licencias/${estado}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (startDate && endDate) {
      url += `/${startDate}/${endDate}`;
    }
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las licencias: ${error}`);
    }
  }

  async aprobarLicencia(licenciaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/licencias/aprobar/${licenciaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await this.http
        .post<any>(url, {}, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async rechazarLicencia(licenciaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/licencias/rechazar/${licenciaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await this.http
        .post<any>(url, {}, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllGestiones(
    facultadId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/calendario/gestiones/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las gestiones: ${error}`);
    }
  }

  async getAllFechas(
    gestionId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/calendario/fechas/${gestionId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las fechas: ${error}`);
    }
  }

  async createFecha(fechaData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/calendario/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, fechaData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteFecha(fechaId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/calendario/delete/${fechaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateFecha(
    fechaId: string,
    fechaData: any,
    token: string
  ): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/calendario/update/${fechaId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, fechaData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllTipos(
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/calendario/tipos`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener los tipos: ${error}`);
    }
  }

  async getAllProgramaciones(
    facultadId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/grupos/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las programaciones: ${error}`);
    }
  }

  async getAllCarreraFac(
    facultadId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/carreras/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las carreras: ${error}`);
    }
  }

  async getAllModulosFac(
    facultadId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/modulos/${facultadId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener los modulos: ${error}`);
    }
  }

  async getAllMateriaCarrera(
    carreraId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/carreras/materias/${carreraId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener las carreras: ${error}`);
    }
  }

  async createProgramacion(grupoData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/programacion/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, grupoData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getFacultadGestion(
    gestionId: string,
    token: string
  ): Promise<any> {
    let url = `${this.BASE_URL}/adminuser/programacion/facultadGestion/${gestionId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error al obtener la facultad: ${error}`);
    }
  }

  /***AUTHENTICATION METHODS */
  logOut(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("permissions");
    this.authStatus.next(false);
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      return !!token;
    }
    return false;
  }

  private getRoles(): string[] {
    if (typeof localStorage !== "undefined") {
      const roles = localStorage.getItem("roles");
      if (roles) {
        return JSON.parse(roles);
      }
    }
    return [];
  }

  getUserPermissions(): string[] {
    if (typeof localStorage !== "undefined") {
      const permissions = localStorage.getItem("permissions");
      if (permissions) {
        return JSON.parse(permissions);
      }
    }
    return [];
  }

  isAdmin(): boolean {
    const roles = this.getRoles();
    console.log(roles);
    return roles.includes("ADMIN");
  }

  isUser(): boolean {
    if (typeof localStorage !== "undefined") {
      const roles = this.getRoles();
      console.log(roles);
      return roles.includes("USER");
    }
    return false;
  }

  HasPermission(permission: string): boolean {
    if (typeof localStorage !== "undefined") {
      const roles = this.getRoles();
      console.log(roles);
      return roles.includes(permission);
    }
    return false;
  }
}
