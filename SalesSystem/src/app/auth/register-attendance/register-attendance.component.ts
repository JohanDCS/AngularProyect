import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth.service';
import { NotificationService } from 'src/app/services/controller/notification.service';

@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.component.html',
  styleUrl: './register-attendance.component.css'
})
export class RegisterAttendanceComponent {
  form: FormGroup = this.formGroup.group({
		nombres: [
			'',
			[Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.min(0)],
		],
		apellidos: [
			'',
			[Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.min(0)],
		],
		dni: [
			'',
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
		password: [
			'',
			[Validators.required, Validators.min(0)],
		],
		TipoCargo: [
			'',
			[Validators.required],
		],
		TipoDocIdentidad: [
			'',
			[Validators.required],
		],
		TipoUsuario: [
			'',
			[Validators.required],
		],
		turno: [
			'',
			[Validators.required],
		],
	});
	constructor(
		private renderer: Renderer2,
		private formGroup: FormBuilder,
		private authservice: AuthService,
		private notification: NotificationService
	) {}
	ngOnInit(): void {
		this.renderer.addClass(document.body, 'body-for-selector-login');
	}
	ngOnDestroy(): void {
		this.renderer.removeClass(document.body, 'body-for-selector-login');
	}
	passwordVisible: Boolean = false;
	registerAttendance() {
		console.log(this.form.value)
		const Nombres = this.form.get('nombres')?.value;
		const Apellidos = this.form.get('apellidos')?.value;
		const NumDoc = this.form.get('dni')?.value;
		const password = this.form.get('password')?.value;
		const TipoCargo = this.form.get('TipoCargo')?.value;
		const TipoDocIdentidad = this.form.get('TipoDocIdentidad')?.value;
		const TipoUsuario = this.form.get('TipoUsuario')?.value;
		const turno = this.form.get('turno')?.value;

		this.authservice.register({
			Nombres: Nombres,
			Apellidos: Apellidos,
			NumDoc: NumDoc,
			password: password,
			TipoCargo: TipoCargo,
			TipoDocIdentidad: TipoDocIdentidad,
			TipoUsuario: TipoUsuario,
			turno: turno
		}).subscribe({
			next: (value) => {
				console.log(value)
				this.notification.success(value.message);
			},
			error: (value) => {
				this.notification.errorEvent(value);
			},
		});
	}
}
