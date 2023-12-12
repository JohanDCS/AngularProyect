import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { environment } from 'src/environments/environment';
import { DataTables_AjaxCallback, DataTablesResponse } from 'src/interface/DataTable.interface';
import { DataTables_Spanish } from 'src/utils/proyect.utils';

@Component({
	selector: 'app-pages-sales-system',
	templateUrl: './pages.sales-system.component.html',
	styleUrls: ['./pages.sales-system.component.css'],
})
export class PagesSalesSystemComponent {
	viewShoppingCart = 2;

	constructor() {}

	onClickShowShoppingCart(value: number) {
		this.viewShoppingCart = value;
		if (this.viewShoppingCart > 2 || this.viewShoppingCart < 0) this.viewShoppingCart = 0;
	}

	@Output() emitClearCart = new EventEmitter<string>();
	clearCart() {
		this.emitClearCart.emit();
	}
}