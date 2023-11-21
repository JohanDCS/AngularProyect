import { Component, EventEmitter, Output } from '@angular/core';

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
