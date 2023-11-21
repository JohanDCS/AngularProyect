import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginSalesSystemComponent } from './login-sales-system/login-sales-system.component';
import { LoginAttendanceComponent } from './login-attendance/login-attendance.component';

const routes: Routes = [
	{ path: 'login-sales-system', component: LoginSalesSystemComponent },
	{ path: 'login-attendance', component: LoginAttendanceComponent },
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
