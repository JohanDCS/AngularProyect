import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/api/attendance.service';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { CampusDB } from 'src/models/campus.interface';

@Component({
	selector: 'app-login-attendance',
	templateUrl: './login-attendance.component.html',
	styleUrls: ['./login-attendance.component.css'],
})
export class LoginAttendanceComponent implements OnInit, OnDestroy {
	form: FormGroup = this.formGroup.group({
		ruc: [
			'',
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
		token: [
			'',
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
	});
	constructor(
		private renderer: Renderer2,
		private formGroup: FormBuilder,
		private attendanceService: AttendanceService,
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
		const ruc = this.form.get('ruc')?.value;
		const token = this.form.get('token')?.value;
		this.attendanceService.load(ruc, token).subscribe({
			next: (value) => {
				this.notification.success(value.message);
				localStorage.setItem('tokenAttendance', value.attendance_CampusID);
				this.router.navigate(['pages/attendance']);
			},
			error: (value) => {
				this.notification.errorEvent(value);
			},
		});
	}
}
