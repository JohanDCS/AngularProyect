import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
	selector: 'app-header-sales-system',
	templateUrl: './header-sales-system.component.html',
	styleUrls: ['./header-sales-system.component.css'],
})
export class HeaderSalesSystemComponent {

	constructor(private authService: AuthService){}

	logout(){
		this.authService.logout();
	}
}
