import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
	selector: 'app-sidebar-sales-system',
	templateUrl: './sidebar-sales-system.component.html',
	styleUrls: ['./sidebar-sales-system.component.css'],
})
export class SidebarSalesSystemComponent {
	
	constructor(private router: Router){}

	navegar(){
		this.router.navigate(['sales-system/users']);
	}
}
