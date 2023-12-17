import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSalesSystemComponent } from './header-sales-system/header-sales-system.component';
import { FooterSalesSystemComponent } from './footer-sales-system/footer-sales-system.component';
import { SidebarSalesSystemComponent } from './sidebar-sales-system/sidebar-sales-system.component';
import { Select2Module } from 'ng-select2-component';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [
		HeaderSalesSystemComponent,
		FooterSalesSystemComponent,
		SidebarSalesSystemComponent,
	],
	imports: [CommonModule, Select2Module, RouterModule],
	exports: [
		HeaderSalesSystemComponent,
		FooterSalesSystemComponent,
		SidebarSalesSystemComponent,
		RouterModule
	],
})
export class SharedSalesSystemModule {}
