import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectorLoginComponent } from './selector-login/selector-login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AuthGuard } from '../services/guard/auth.guard';
import { SalesSystemRoutingModule } from './sales-system/pages-sales-system/sales-system-routing.module';

const routes: Routes = [
	{
		path: 'pages',
		children: [
			{ path: 'selector-login', component: SelectorLoginComponent },
			{ path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes), SalesSystemRoutingModule],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
