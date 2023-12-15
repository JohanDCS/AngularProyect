import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface asistencia{
    NumDoc: number;
    Fecha: Date;
}

@Injectable({
	providedIn: 'root',
})
export class AsistenciaService {
	private apiURL = `${environment.API_REST.URL}/asistencia`;
	constructor(private http: HttpClient) {}
	markAttendance(data: asistencia): Observable<any> {
		return this.http.post(`${this.apiURL}/create/assist-control`, data );
	}
	load(ruc: number, token: string): Observable<any> {
		return this.http.post(`${this.apiURL}/login/`, { ruc, token });
	}
}