import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSalesSystemComponent } from './login-sales-system/login-sales-system.component';
import { LoginAttendanceComponent } from './login-attendance/login-attendance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';

@NgModule({
	declarations: [LoginSalesSystemComponent, LoginAttendanceComponent, RegisterAttendanceComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
