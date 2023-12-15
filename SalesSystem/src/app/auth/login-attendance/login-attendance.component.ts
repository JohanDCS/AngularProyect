import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/api/attendance.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { CampusDB } from 'src/models/campus.interface';

@Component({
	selector: 'app-login-attendance',
	templateUrl: './login-attendance.component.html',
	styleUrls: ['./login-attendance.component.css'],
})
export class LoginAttendanceComponent implements OnInit, OnDestroy {
	form: FormGroup = this.formGroup.group({
		dni: [
			'',
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
		password: [
			'',[Validators.required],
		],
		token: [
			'',
			[Validators.required],
		],
	});
	constructor(
		private renderer: Renderer2,
		private formGroup: FormBuilder,
		private authService: AuthService,
		private notification: NotificationService,
		private router: Router,
	) {}
	ngOnInit(): void {
		this.renderer.addClass(document.body, 'body-for-selector-login');
	}
	ngOnDestroy(): void {
		this.renderer.removeClass(document.body, 'body-for-selector-login');
	}
	passwordVisible: Boolean = false;
	loginAttendance() {
		const dni = this.form.get('dni')?.value;
		const password = this.form.get('password')?.value;
		const token = this.form.get('token')?.value;
		this.authService.logeo({
			codeEmpresa: token,
			password: password,
			NumDoc: dni
		}).subscribe({
			next: (value) => {
				console.log(value)
				this.notification.success(value.message);
				localStorage.setItem('tokenAttendance', value);
				this.router.navigate(['pages/attendance']);
			},
			error: (value) => {
				this.notification.errorEvent(value);
			},
		});
	}
}
