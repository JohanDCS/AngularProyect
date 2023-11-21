import { PriceGroupDB } from './priceGroup.interface';
import { ProductDB } from './product.interface';

export interface PriceDB {
	id: number;
	product: ProductDB;
	priceGroup: PriceGroupDB;
	price: number;
	updatedAt: Date;
	createdAt: Date;
}
