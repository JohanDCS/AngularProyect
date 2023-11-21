import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AttendanceService {
	private apiURL = `${environment.API_REST.URL}/attendance`;
	constructor(private http: HttpClient) {}
	markAttendance(dni: number): Observable<any> {
		return this.http.post(`${this.apiURL}/markAttendance/`, { dni });
	}
	load(ruc: number, token: string): Observable<any> {
		return this.http.post(`${this.apiURL}/login/`, { ruc, token });
	}
}
