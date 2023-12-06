import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface login{
    Username: number;
    Password: string;
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
}
