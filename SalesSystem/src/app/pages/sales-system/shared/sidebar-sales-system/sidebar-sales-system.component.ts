import { Component } from '@angular/core';
declare var $: any;
@Component({
	selector: 'app-sidebar-sales-system',
	templateUrl: './sidebar-sales-system.component.html',
	styleUrls: ['./sidebar-sales-system.component.css'],
})
export class SidebarSalesSystemComponent {
	openModal(){
		$('#miModal').modal('show');
	}
}
