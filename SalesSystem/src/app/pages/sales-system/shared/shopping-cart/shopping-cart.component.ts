import { Component, EventEmitter, Input, OnInit } from '@angular/core';
interface SalesProduct {
	name: string;
	price: number;
	priceTotal: number;
	cant: number;
}

@Component({
	selector: 'app-shopping-cart',
	/*standalone: true,
	imports: [CommonModule],*/
	templateUrl: './shopping-cart.component.html',
	styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
	listSales: Array<SalesProduct> = new Array<SalesProduct>();
	@Input() inputClearCart?: EventEmitter<string>;

	ngOnInit(): void {
		this.listSales.push({
			name: 'AeroPhone X20',
			price: 1200,
			cant: 1,
			priceTotal: 1200,
		});
		this.listSales.push({
			name: 'QuantumBook Pro',
			price: 2500,
			cant: 1,
			priceTotal: 2500,
		});
		this.listSales.push({
			name: 'VirtuGlass VR',
			price: 800,
			cant: 1,
			priceTotal: 800,
		});
		this.listSales.push({
			name: 'NanoFit Band',
			price: 300,
			cant: 1,
			priceTotal: 300,
		});
		this.listSales.push({
			name: 'SkyDrone 360',
			price: 1500,
			cant: 1,
			priceTotal: 1500,
		});
		this.listSales.push({
			name: 'EcoSmart Fridge',
			price: 2000,
			cant: 1,
			priceTotal: 2000,
		});
		this.listSales.push({
			name: 'RoboChef 5000',
			price: 3000,
			cant: 1,
			priceTotal: 3000,
		});
		this.listSales.push({
			name: 'CleanAir Home System',
			price: 1000,
			cant: 1,
			priceTotal: 1000,
		});
		this.listSales.push({
			name: 'AquaPower Shower',
			price: 500,
			cant: 1,
			priceTotal: 500,
		});
		this.listSales.push({
			name: 'GalaxyPad Flex',
			price: 1100,
			cant: 1,
			priceTotal: 1100,
		});
		this.listSales.push({
			name: 'SolarCharge Backpack',
			price: 250,
			cant: 1,
			priceTotal: 250,
		});
		this.listSales.push({
			name: 'SoundSphere 360',
			price: 450,
			cant: 1,
			priceTotal: 450,
		});
		this.listSales.push({
			name: 'MindLink Headset',
			price: 550,
			cant: 1,
			priceTotal: 550,
		});
		this.listSales.push({
			name: 'HomeBot Assistant',
			price: 2200,
			cant: 1,
			priceTotal: 2200,
		});
		this.listSales.push({
			name: 'CyberGlove Interactive',
			price: 600,
			cant: 1,
			priceTotal: 600,
		});

		this.inputClearCart?.subscribe(() => {
			this.listSales = [];
		});
	}
	onClickDecrease(index: number) {
		const product = this.listSales.at(index);
		if (product && product.cant > 0) product.cant--;
		this.refreshPrice(index);
	}
	onClickIncrease(index: number) {
		const product = this.listSales.at(index);
		if (product) product.cant++;
		this.refreshPrice(index);
	}
	onClickRemove(index: number) {
		this.listSales.splice(index, 1);
	}
	private refreshPrice(index: number) {
		const product = this.listSales.at(index);
		if (product) {
			product.priceTotal = product.price * product.cant;
		}
	}

	get priceTotalBuy(): number {
		let price = 0;
		this.listSales.forEach((x) => {
			price += x.priceTotal;
		});
		return price;
	}
}
