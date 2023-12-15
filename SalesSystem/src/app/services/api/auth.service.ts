import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface login{
    NumDoc: number;
    password: string;
    codeEmpresa: string;
}
export interface register{
  Nombres: string;
  Apellidos: string;
  NumDoc: number;
  password: string;
  TipoCargo: string;
  TipoDocIdentidad: string;
  TipoUsuario: string;
  turno: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.API_REST.URL}/auth`;
  constructor(private http: HttpClient) { }
  
  logeo(Data: login): Observable<any>{
    return this.http.post(`${this.apiURL}/login`,Data);
  }

  register(data:register): Observable<any>{
    return this.http.post(`${this.apiURL}/register`,data);
  }

  public getUserInfo(): any {
		const token = localStorage.getItem('tokenAttendance');
		if (token) {
			// Decodificar el token para obtener información del usuario
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			const data = JSON.parse(atob(base64));
			return data;
		}
		return null;
	}
  
}
