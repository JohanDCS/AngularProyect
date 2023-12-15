import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSalesSystemComponent } from './header-sales-system/header-sales-system.component';
import { FooterSalesSystemComponent } from './footer-sales-system/footer-sales-system.component';
import { SidebarSalesSystemComponent } from './sidebar-sales-system/sidebar-sales-system.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
	declarations: [
		HeaderSalesSystemComponent,
		FooterSalesSystemComponent,
		SidebarSalesSystemComponent,
	],
	imports: [CommonModule, Select2Module],
	exports: [
		HeaderSalesSystemComponent,
		FooterSalesSystemComponent,
		SidebarSalesSystemComponent,
	],
})
export class SharedSalesSystemModule {}
