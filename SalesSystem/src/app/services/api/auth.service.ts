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
}
