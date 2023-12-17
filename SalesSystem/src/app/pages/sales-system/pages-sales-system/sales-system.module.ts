import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSalesSystemComponent } from './home/home.sales-system.component';
import { PagesSalesSystemComponent } from './pages.sales-system.component';
import { SharedSalesSystemModule } from '../shared/shared.sales-system.module';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ClientsComponent } from './clients/clients.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [HomeSalesSystemComponent, PagesSalesSystemComponent, ClientsComponent],
	imports: [CommonModule, RouterModule, SharedSalesSystemModule, DataTablesModule, ReactiveFormsModule],
})
export class SalesSystemModule {}
