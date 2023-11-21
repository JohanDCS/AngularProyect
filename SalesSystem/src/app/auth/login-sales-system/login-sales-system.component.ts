import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-sales-system',
	templateUrl: './login-sales-system.component.html',
	styleUrls: ['./login-sales-system.component.css'],
})
export class LoginSalesSystemComponent implements OnInit, OnDestroy {
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
	}
}
