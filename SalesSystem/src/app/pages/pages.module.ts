import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorLoginComponent } from './selector-login/selector-login.component';
import { RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesSystemModule } from './sales-system/pages-sales-system/sales-system.module';
import { Select2Module } from 'ng-select2-component';

@NgModule({
	declarations: [SelectorLoginComponent, AttendanceComponent],
	imports: [
		CommonModule,
		RouterModule,
		DataTablesModule,
		ReactiveFormsModule,
		SalesSystemModule,
		Select2Module,
	],
})
export class PagesModule {}
